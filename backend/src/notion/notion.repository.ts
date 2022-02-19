import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Logger, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs';
import { EntityRepository, IsNull, Not, Repository } from 'typeorm';
import { Lexer } from 'marked';
import { parseISO } from 'date-fns';

import * as helper from '@src/share/utils';
import { User } from '@src/user/entity/user.entity';
import { CreatePostDTO } from './domain/dto/create-post.dto';
import { PatchPostDTO } from './domain/dto/patch-post.dto';
import { DatabaseQueryResult } from './domain/types/database-query-result';
import { NotionBlock } from './domain/types/notion-block';
import { NotionPost } from './domain/types/notion-post';
import { NotionConfigService } from './notion.config.service';
import { Notion } from './domain/entity/notion.entity';
import { extractThumbnailFromPost } from '@src/share/utils/extractThumbnailFromPost';

@EntityRepository(Notion)
export class NotionRepository extends Repository<Notion> {
  private readonly logger: Logger = new Logger(NotionRepository.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly notionConfigService: NotionConfigService,
  ) {
    super();
  }

  async findPostsFromServer(): Promise<NotionPost[]> {
    const result: DatabaseQueryResult = await this.findPosts();

    const parseQueryResult = (query: DatabaseQueryResult): NotionPost[] => {
      const distributedPosts = query.results.filter((item) => {
        return item.properties?.publishToBlog?.select?.name === '배포';
      });

      return distributedPosts.map((result) => ({
        id: result.id,
        title: result?.properties?.['이름']?.title?.[0]?.plain_text!,
        url: result.url,
        createdAt: parseISO(result.created_time),
        updatedAt: parseISO(result.last_edited_time),
        // publishToBlog: result.properties?.publishToBlog.select.name,
      }));
    };

    return parseQueryResult(result);
  }

  async findPostsFromLocal(): Promise<NotionPost[]> {
    return (await this.find()) as NotionPost[];
  }

  async findPost(url: string): Promise<NotionBlock> {
    const res = await this.httpService
      .get(`/blocks/${url}/children`)
      .pipe(map((r) => r.data))
      .toPromise();
    return res;
  }

  async findPosts(): Promise<DatabaseQueryResult> {
    const databaseId = await this.notionConfigService.getNotionConfigByKey(
      'NOTION_DATABASE_ID',
    );

    const res = await this.httpService
      .post(`/databases/${databaseId}/query`, {})
      .pipe(map((r) => r.data))
      .toPromise();
    return res;
  }

  async findByNotionId(notionId: string): Promise<Notion> {
    try {
      return await this.findOneOrFail(
        { id: notionId },
        { relations: ['user'] },
      );
    } catch (error) {
      throw new NotFoundException();
    }
  }

  parseContent(content: string, length?: number) {
    const markdownAst = new Lexer().lex(content);
    const parsedParagraph = markdownAst
      .filter((block: any) => block?.type === 'paragraph')
      .filter((block: any) => block?.tokens?.[0].type === 'text');

    const convertString = parsedParagraph.map((block: any) => block?.text);

    return length
      ? convertString.join(' ').substr(0, length)
      : convertString.join(' ');
  }

  async createPost(user: User, post: CreatePostDTO): Promise<Notion> {
    const newPost = this.create(post);
    newPost.user = user;
    newPost.thumbnail = extractThumbnailFromPost(post)!;
    newPost.description = this.parseContent(post.content, 100);
    newPost.slug = helper.slugify(post.title);
    return await this.save(newPost);
  }

  async findById(id: string): Promise<Notion> {
    try {
      return await this.findOneOrFail({ id }, { relations: ['user'] });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  hasUserCollectPermission(user: User, post: Notion): boolean {
    return post.user.id === user.id;
  }

  async patchPost(
    user: User,
    postId: string,
    updateDTO: PatchPostDTO,
  ): Promise<Notion> {
    const findPost = await this.findById(postId);

    if (!this.hasUserCollectPermission(user, findPost)) {
      throw new ForbiddenException();
    }
    const updatePost: Notion = Object.assign(findPost, updateDTO);
    return await this.save(updatePost);
  }

  async syncPost(
    user: User,
    postDto: PatchPostDTO | CreatePostDTO,
    postId: string,
  ) {
    let existPostAtLocal: Notion;
    try {
      existPostAtLocal = await this.findByNotionId(postId);
    } catch (error) {
      throw error;
    }

    if (existPostAtLocal) {
      try {
        await this.patchPost(
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
        if (error instanceof Error)
          this.logger.error(error.message, error.stack);
        else this.logger.error(error);
      }
    } else {
      try {
        await this.createPost(user, postDto as CreatePostDTO);

        return {
          operation: 'create',
          notionId: postId,
          message: `post ${postId}. created OK`,
        };
      } catch (error) {
        if (error instanceof Error)
          this.logger.error(error.message, error.stack);
        else this.logger.error(error);
      }
    }
  }
}
