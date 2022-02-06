import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { map } from 'rxjs';
import { IsNull, Not } from 'typeorm';

import { Post } from '@src/post/entity/post.entity';
import { PostRepository } from '@src/post/post.repository';
import { PostService } from '@src/post/post.service';
import { User } from '@src/user/entity/user.entity';
import { CreatePostDTO } from './domain/dto/create-post.dto';
import { PatchPostDTO } from './domain/dto/patch-post.dto';
import { DatabaseQueryResult } from './domain/types/database-query-result';
import { NotionBlock } from './domain/types/notion-block';
import { NotionPost } from './domain/types/notion-post';
import { NotionConfigService } from './notion.config.service';

@Injectable()
export class NotionRepository {
  private readonly logger: Logger = new Logger(NotionRepository.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly notionConfigService: NotionConfigService,
    private readonly postService: PostService,
    private readonly postRepository: PostRepository,
  ) {}

  async findPostsFromServer() {
    const result: DatabaseQueryResult = await this.getPosts();

    const parseQueryResult = (query: DatabaseQueryResult): NotionPost[] => {
      const result = query.results.filter((item) => {
        return item.properties?.publishToBlog?.select?.name === '배포';
      });

      return result.map((result) => ({
        id: result.id,
        title: result.properties.이름.title?.[0]?.plain_text,
        url: result.url,
        createdAt: result.created_time,
        updatedAt: result.last_edited_time,
        publishToBlog: result.properties?.publishToBlog.select.name,
      }));
    };

    const parsed: NotionPost[] = parseQueryResult(result);
    return parsed;
  }

  async findPostsFromLocal() {
    return await this.postRepository.find({
      where: { notionId: Not(IsNull()) },
    });
  }

  async getPost(url: string): Promise<NotionBlock> {
    const res = await this.httpService
      .get(`/blocks/${url}/children`)
      .pipe(map((r) => r.data))
      .toPromise();
    return res;
  }

  async getPosts(): Promise<DatabaseQueryResult> {
    const databaseId = await this.notionConfigService.getNotionConfigByKey(
      'NOTION_DATABASE_ID',
    );

    const res = await this.httpService
      .post(`/databases/${databaseId}/query`, {})
      .pipe(map((r) => r.data))
      .toPromise();
    return res;
  }

  async findByNotionId(notionId: string): Promise<Post> {
    return await this.postService.getById(notionId);
  }

  async syncPost(
    user: User,
    postDto: PatchPostDTO | CreatePostDTO,
    postId: string,
  ) {
    let existPostAtLocal: Post;
    try {
      existPostAtLocal = await this.findByNotionId(postId);
    } catch (error) {}

    if (existPostAtLocal) {
      try {
        await this.postService.patchPost(
          user,
          existPostAtLocal.id,
          postDto as PatchPostDTO,
        );

        return {
          operation: 'patch',
          notionId: postId,
          message: `exist post ${postId}. patched OK`,
        };
      } catch (error) {
        this.logger.error(error.message, error.stack);
      }
    } else {
      try {
        await this.postService.createPost(user, postDto as CreatePostDTO);

        return {
          operation: 'create',
          notionId: postId,
          message: `post ${postId}. created OK`,
        };
      } catch (error) {
        this.logger.error(error.message, error.stack);
      }
    }
  }
}
