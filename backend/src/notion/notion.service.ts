import { IsNull, Not } from 'typeorm';
import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import axios, { AxiosRequestConfig, AxiosRequestHeaders, Axios } from 'axios';
import { writeFileSync } from 'fs';

import { PostRepository } from '@src/post/post.repository';
import { User } from '@src/user/entity/user.entity';
import { PostService } from '@src/post/post.service';
import { Post } from '@src/post/entity/post.entity';
import { NotionPost } from './domain/types/notion-post';
import { PatchPostDTO } from './domain/dto/patch-post.dto';
import { CreatePostDTO } from './domain/dto/create-post.dto';
import { NotionUseCase } from './notion.usecase';
import { NotionConfigService } from './notion.config.service';
// import { Axios } from '@src/share/http-client/axios';

@Injectable()
export class NotionService {
  private readonly logger = new Logger(NotionService.name);
  private httpClient: Axios;
  private config: AxiosRequestConfig;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly postRepository: PostRepository,
    private readonly postService: PostService,
    private readonly notionConfigService: NotionConfigService,
    private readonly notionUseCase: NotionUseCase,
  ) {
    this.initVariables().then(() => {
      this.initService();
    });
  }

  async initService() {
    const url = 'https://api.notion.com/v1';
    const headers: AxiosRequestHeaders = {
      'Notion-Version': '2021-08-16',
      Authorization: `Bearer ${await this.notionConfigService.getNotionConfigByKey(
        'NOTION_API_KEY',
      )}`,
    };

    const config: AxiosRequestConfig = {
      ...headers,
      responseType: 'arraybuffer',
    };

    this.httpClient = axios.create();

    this.config = config;
  }

  async initVariables() {
    this.initService();
    return true;
  }

  async findPostFromServerToString(url: string): Promise<string> {
    return await this.notionUseCase.findPostFromServerToString(url);
  }

  async findByNotionId(notionId: string): Promise<Post> {
    return await this.postRepository.findOne(
      { where: { notionId } },
      // { relations: ['user', 'comments', 'comments.user'] },
    );
  }

  async findPosts() {
    return await this.postRepository.findAndCount({
      where: { notionId: Not(IsNull()) },
    });
  }

  async findPostsWithOutOfSyncByUpdatedAtField(): Promise<NotionPost[]> {
    try {
      const result: NotionPost[] = [];
      const serverPosts = await this.notionUseCase.findPostsFromServer();
      const localPosts = await this.findPosts().then((r) => r[0]);

      serverPosts.forEach((serverPost) => {
        const findLocalPost = localPosts.find((localPost) => {
          return (
            localPost.notionId === serverPost.id &&
            localPost.updatedAt.toISOString() !== serverPost.updatedAt
          );
        });
        // TODO define error type in notionService / findPostsWithOutOfSyncUpdatedAtField
        if (!findLocalPost) return;

        const targetNotionPost = serverPosts.find(
          (serverPost) => serverPost.id === findLocalPost.notionId,
        );
        result.push(targetNotionPost);
      });

      return result;
    } catch (error) {
      throw new Error('findPostsWithOutOfSyncByUpdatedAtField');
    }
  }

  async findPostsNotYetSavedLocal(): Promise<NotionPost[]> {
    try {
      const serverPosts = await this.notionUseCase.findPostsFromServer();
      const localPosts = await this.findPosts().then((r) => r[0]);

      const result: NotionPost[] = [];
      serverPosts.forEach((serverPost) => {
        const isSavedPost = localPosts.some(
          (localPost) => localPost.notionId === serverPost.id,
        );
        !isSavedPost && result.push(serverPost);
      });
      return result;
    } catch (error) {
      throw error || new Error('findPostsNotYetSavedLocal');
    }
  }

  async saveImagesFromPostString(url: string): Promise<string> {
    return this.httpClient
      .get(url, { responseType: 'arraybuffer' })
      .then(async (r) => {
        let originalFileName: string =
          r.request?._redirectable?._options?.pathname;

        originalFileName = originalFileName.replaceAll('/', '_');

        writeFileSync(
          `${process.env.NEST_CONFIG_UPLOADS_PATH}/${originalFileName}`,
          r.data as any,
          'utf-8',
        );
        return originalFileName;
      })
      .catch((e) => {
        throw e || new Error('save images failed');
      });
  }

  async syncPostToLocal(user: User, post: NotionPost) {
    let getPost: string;
    try {
      getPost = await this.findPostFromServerToString(post.id);
    } catch (error) {
      throw new HttpException({ message: 'notion API was busy.' }, 429);
    }

    const postDTO: PatchPostDTO | CreatePostDTO = {
      title: post.title,
      content: getPost,
      notionId: post.id,
      createdAt: post.createdAt as unknown as string,
      updatedAt: post.updatedAt as unknown as string,
    };

    const imageUrls = await this.notionUseCase.findImageUrlsFromRawContent(
      postDTO.content,
    );

    await Promise.all(
      imageUrls.map(async (imageUrl) => {
        const savedImagePath = await this.saveImagesFromPostString(imageUrl);
        postDTO.content = postDTO.content.replace(imageUrl, savedImagePath);
      }),
    );

    let existPostAtLocal: Post;
    try {
      existPostAtLocal = await this.findByNotionId(post.id);
    } catch (error) {}

    if (existPostAtLocal) {
      try {
        await this.postService.patchPost(
          user,
          existPostAtLocal.id,
          postDTO as PatchPostDTO,
        );

        return {
          operation: 'patch',
          notionId: post.id,
          message: `exist post ${post.id}. patched OK`,
        };
      } catch (error) {
        this.logger.error(error.message, error.stack);
      }
    } else {
      try {
        await this.postService.createPost(user, postDTO as CreatePostDTO);

        return {
          operation: 'create',
          notionId: post.id,
          message: `post ${post.id}. created OK`,
        };
      } catch (error) {
        this.logger.error(error.message, error.stack);
      }
    }
  }
}
