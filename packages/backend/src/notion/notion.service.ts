import { IsNull, Not } from 'typeorm';
import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Axios } from '@nestjs/common/node_modules/axios';
import { AxiosRequestConfig } from 'axios';
import { writeFileSync } from 'fs';

import { notion, infrastructure } from '@blog/core';
import { NotionPost } from '@blog/core/dist/notion/useCase/types';
import { CreatePostDTO, PatchPostDTO } from '@blog/core/dist/domain';

import { PostRepository } from '@src/post/post.repository';
import { User } from '@src/user/entity/user.entity';
import { PostService } from '@src/post/post.service';
import { Post } from '@src/post/entity/post.entity';
import { AdminService } from '@src/admin/admin.service';

@Injectable()
export class NotionService {
  notionAPI: notion.useCase.NotionUseCase;
  httpClient: Axios;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly postRepository: PostRepository,
    private readonly postService: PostService,
    private readonly adminService: AdminService,
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
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      },
    };
    const httpClient = new infrastructure.httpClient.Axios(url, config);
    const repository = new notion.repository.BackendRepository(httpClient);
    this.notionAPI = new notion.useCase.NotionUseCase(repository);
    this.httpClient = new Axios({ responseType: 'arraybuffer' });
  }

  async initVariables() {
    process.env.NOTION_API_KEY = (
      await this.adminService.getKeyValue('NOTION_API_KEY')
    )?.value;

    process.env.NOTION_DATABASE_ID = (
      await this.adminService.getKeyValue('NOTION_DATABASE_ID')
    )?.value;

    this.initService();
    return true;
  }

  async findPostsFromServer(): Promise<NotionPost[]> {
    return await this.notionAPI.findPostsFromServer(
      process.env.NOTION_DATABASE_ID,
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
            `${process.env.UPLOADS_PATH}${originalFileName}`,
            r.data as any,
            'utf-8',
          );
          return originalFileName;
        } catch (error) {
          throw Error(error.message);
        }
      })
      .catch((e) => {
        throw new Error(e.message);
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
