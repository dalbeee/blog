import { ForbiddenException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Lexer } from 'marked';

import * as helper from '@src/share/utils';
import { User } from '@src/user/entity/user.entity';
import { CreatePostDTO } from './domain/dto/create-post.dto';
import { PatchPostDTO } from './domain/dto/patch-post.dto';
import { Notion } from './domain/entity/notion.entity';
import { extractThumbnailFromPost } from '@src/share/utils/extractThumbnailFromPost';
import { NotionPost } from './domain/types/notion-post';

@EntityRepository(Notion)
export class NotionRepository extends Repository<Notion> {
  private logger: Logger = new Logger('NotionRepository');

  async findPosts(): Promise<NotionPost[]> {
    return await this.find({ order: { createdAt: 'DESC' } });
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

  async findById(id: string): Promise<Notion> {
    try {
      return await this.findOneOrFail({ id }, { relations: ['user'] });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createPost(user: User, post: CreatePostDTO): Promise<Notion> {
    const newPost = this.create(post);
    newPost.id = post.notionId!;
    newPost.user = user;
    newPost.thumbnail = extractThumbnailFromPost(post)!;
    newPost.description = this.parseContent(post.content, 100);
    newPost.slug = helper.slugify(post.title);
    return await this.save(newPost);
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
    let existPostAtLocal: Notion | null;

    try {
      existPostAtLocal = await this.findById(postId);
    } catch (error) {
      existPostAtLocal = null;
    }

    if (existPostAtLocal) {
      await this.patchPost(user, existPostAtLocal.id, postDto as PatchPostDTO);

      return {
        operation: 'patch',
        id: postId,
        message: `exist post ${postId}. patched OK`,
      };
    } else {
      await this.createPost(user, postDto as CreatePostDTO);

      return {
        operation: 'create',
        id: postId,
        message: `post ${postId}. created OK`,
      };
    }
  }
}
