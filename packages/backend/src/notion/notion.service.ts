import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Cache } from 'cache-manager';

import { notion, infrastructure } from '@blog/core';
import { NotionPost } from '@blog/core/dist/notion/useCase/types';

import { PostRepository } from '@src/post/post.repository';
import { User } from '@src/user/entity/user.entity';
import { CreatePostDTO, PatchPostDTO } from '@src/post/dto/post.dto';
import { PostService } from '@src/post/post.service';

@Injectable()
export class NotionService {
  notionAPI: notion.useCase.NotionUseCase;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly postRepository: PostRepository,
    private readonly postService: PostService,
  ) {
    const url = 'https://api.notion.com/v1';
    const config: AxiosRequestConfig = {
      headers: {
        'Notion-Version': '2021-08-16',
        Authorization: `Bearer ${process.env.SECRET_NOTION}`,
      },
      withCredentials: true,
    };

    const httpClient = new infrastructure.Axios(url, config);
    const repository = new notion.repository.BackendRepository(httpClient);
    this.notionAPI = new notion.useCase.NotionUseCase(repository);
  }

  async getPostsFromServer(): Promise<NotionPost[]> {
    return await this.notionAPI.getPosts(process.env.NOTION_DATABASE_ID);
  }

  async getPostToString(url: string): Promise<string> {
    return await this.notionAPI.getPost(url);
  }

  async findPostsDerivedNotion() {
    return await this.postRepository.findAndCount({
      where: { notionId: true },
    });
  }

  async findPostsWithOutOfSyncUpdatedAtField(): Promise<NotionPost[]> {
    const result: NotionPost[] = [];

    const recentPosts = await this.getPostsFromServer();
    const savedPosts = await this.findPostsDerivedNotion().then((r) => r[0]);

    recentPosts.forEach((recentPost) => {
      const findPost = savedPosts.find((savedPost) => {
        return (
          savedPost.notionId === recentPost.id &&
          savedPost.updatedAt.toISOString() !== recentPost.updatedAt
        );
      });
      if (!findPost) return;

      const targetNotionPost = recentPosts.find(
        (post) => post.id === findPost.notionId,
      );
      result.push(targetNotionPost);
    });

    return result;
  }

  async findNotionPostsNotYetSavedLocal(): Promise<NotionPost[]> {
    const serverPosts = await this.getPostsFromServer();
    const localPosts = await this.findPostsDerivedNotion().then((r) => r[0]);

    const result: NotionPost[] = [];
    serverPosts.forEach((serverPost) => {
      const isSavedPost = localPosts.some(
        (localPost) => localPost.notionId === serverPost.id,
      );
      !isSavedPost && result.push(serverPost);
    });
    return result;
  }

  async saveOrUpdateNotionPostToLocal(user: User, post: NotionPost) {
    let getPost: string;
    try {
      getPost = await this.getPostToString(post.id);
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

    try {
      const result = await this.postService.getByNotionId(post.id);
      await this.postService.patchPost(
        user,
        result.id,
        postDTO as PatchPostDTO,
      );
      return {
        operation: 'patch',
        notionId: post.id,
        message: `exist post ${post.id}. patched OK`,
      };
    } catch (error) {
      await this.postService.createPost(user, postDTO as CreatePostDTO);

      return {
        operation: 'create',
        notionId: post.id,
        message: `post ${post.id}. created OK`,
      };
    }
  }
}
