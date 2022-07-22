import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lexer } from 'marked';

import * as helper from '@src/share/utils';
import { CreatePostDTO } from './domain/dto/create-post.dto';
import { PatchPostDTO } from './domain/dto/patch-post.dto';
import { Notion } from './domain/entity/notion.entity';
import { extractThumbnailFromPost } from '@src/share/utils/extractThumbnailFromPost';
import { NotionPost } from './domain/types/notion-post';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotionRepository {
  private logger: Logger = new Logger('NotionRepository');
  constructor(
    @InjectRepository(Notion)
    private readonly notionRepository: Repository<Notion>,
  ) {}

  async findPosts(): Promise<NotionPost[]> {
    const result = await this.notionRepository.find({
      order: { createdAt: 'DESC' },
    });
    return result ?? [];
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
      return await this.notionRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createPost(post: CreatePostDTO): Promise<Notion> {
    const newPost = this.notionRepository.create(post);
    newPost.id = post.notionId!;
    newPost.author = post.author;
    newPost.thumbnail = extractThumbnailFromPost(post)!;
    newPost.description = this.parseContent(post.content, 100);
    newPost.slug = helper.slugify(post.title);
    return await this.notionRepository.save(newPost);
  }

  async patchPost(postId: string, updateDTO: PatchPostDTO): Promise<Notion> {
    const findPost = await this.findById(postId);
    const updatePost: Notion = Object.assign(findPost, updateDTO);
    return await this.notionRepository.save(updatePost);
  }

  async syncPost(postDto: PatchPostDTO | CreatePostDTO, postId: string) {
    let existPostAtLocal: Notion | null;

    try {
      existPostAtLocal = await this.findById(postId);
    } catch (error) {
      existPostAtLocal = null;
    }

    if (existPostAtLocal) {
      await this.patchPost(existPostAtLocal.id, postDto as PatchPostDTO);

      return {
        operation: 'patch',
        id: postId,
        message: `exist post ${postId}. patched OK`,
      };
    } else {
      await this.createPost(postDto as CreatePostDTO);

      return {
        operation: 'create',
        id: postId,
        message: `post ${postId}. created OK`,
      };
    }
  }
}
