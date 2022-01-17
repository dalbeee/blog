import { IsNull, Not } from 'typeorm';
import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { AxiosRequestConfig, Axios } from 'axios';
import { writeFileSync } from 'fs';

import { PostRepository } from '@src/post/post.repository';
import { User } from '@src/user/entity/user.entity';
import { PostService } from '@src/post/post.service';
import { Post } from '@src/post/entity/post.entity';
import { NotionPost } from './domain/types/notion-post';
import { PatchPostDTO } from './domain/dto/patch-post.dto';
import { CreatePostDTO } from './domain/dto/create-post.dto';
import { NotionUseCase } from './notion.usecase';
import { NotionRepository } from './notion.repository';
import { Axios as HttpClientAxios } from '../share/http-client/axios';
import { NotionConfigService } from './notion.config.service';

@Injectable()
export class NotionService {
  notionAPI: NotionUseCase;
  httpClient: Axios | HttpClientAxios;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly postRepository: PostRepository,
    private readonly postService: PostService,
    private readonly notionConfigService: NotionConfigService,
  ) {
    this.initVariables().then(() => {
      this.initService();
    });
  }

  async initService() {
    const url = 'https://api.notion.com/v1';
    const config: AxiosRequestConfig = {
      headers: {
        'Notion-Version': '2021-08-16',
        Authorization: `Bearer ${await this.notionConfigService.notionApiKey()}`,
      },
    };
    const httpClient = new HttpClientAxios(url, config);
    const repository = new NotionRepository(httpClient);
    this.notionAPI = new NotionUseCase(repository);
    this.httpClient = new Axios({});
  }

  async initVariables() {
    this.initService();
    return true;
  }

  async findPostsFromServer(): Promise<NotionPost[]> {
    return await this.notionAPI.findPostsFromServer(
      await this.notionConfigService.notionDatabaseId(),
    );
  }

  async findPostFromServerToString(url: string): Promise<string> {
    try {
      return await this.notionAPI.findPostFromServerToString(url);
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
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
    const result: NotionPost[] = [];

    const serverPosts = await this.findPostsFromServer();
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
  }

  async findPostsNotYetSavedLocal(): Promise<NotionPost[]> {
    const serverPosts = await this.findPostsFromServer();
    const localPosts = await this.findPosts().then((r) => r[0]);

    const result: NotionPost[] = [];
    serverPosts.forEach((serverPost) => {
      const isSavedPost = localPosts.some(
        (localPost) => localPost.notionId === serverPost.id,
      );
      !isSavedPost && result.push(serverPost);
    });
    return result;
  }

  async saveImagesFromPostString(url: string): Promise<string> {
    return this.httpClient
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then(async (r) => {
        let originalFileName: string =
          r.request?._redirectable?._options?.pathname;
        originalFileName = originalFileName.replaceAll('/', '_');

        try {
          writeFileSync(
            `${process.env.NEST_CONFIG_UPLOADS_PATH}/${originalFileName}`,
            r.data as any,
            'utf-8',
          );
          return originalFileName;
        } catch (error) {
          throw Error(error.message);
        }
      })
      .catch((e) => {
        throw new Error('save images failed');
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

    const imageUrls = await this.notionAPI.findImageUrlsFromRawContent(
      postDTO.content,
    );

    try {
      await Promise.all(
        imageUrls.map(async (imageUrl) => {
          const savedImagePath = await this.saveImagesFromPostString(imageUrl);
          postDTO.content = postDTO.content.replace(imageUrl, savedImagePath);
        }),
      );
    } catch (error) {
      throw Error(error.message);
    }

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
        console.log('update error', error.message);
        throw new InternalServerErrorException(error.message);
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
        console.log('create error', error.message);
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
