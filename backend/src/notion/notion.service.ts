import { IsNull, Not } from 'typeorm';
import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import axios from 'axios';
import { writeFileSync } from 'fs';

import { PostRepository } from '@src/post/post.repository';
import { User } from '@src/user/entity/user.entity';
import { NotionPost } from './domain/types/notion-post';
import { PatchPostDTO } from './domain/dto/patch-post.dto';
import { CreatePostDTO } from './domain/dto/create-post.dto';
import { NotionConfigService } from './notion.config.service';
import { NotionRepository } from './notion.repository';
import { parseNotionPostToMarkdown } from './util';
import { DatabaseQueryResult } from './domain/types/database-query-result';
import { findImageUrlsFromRawContent } from './util/findImageUrlsFromRawContent';
import { NotionBlock } from './domain/types/notion-block';

@Injectable()
export class NotionService {
  private readonly logger = new Logger(NotionService.name);
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly postRepository: PostRepository,
    private readonly notionConfigService: NotionConfigService,
    private readonly notionRepository: NotionRepository,
  ) {}

  async findPosts() {
    return await this.postRepository.findAndCount({
      where: { notionId: Not(IsNull()) },
    });
  }

  async findPostToMarkdownFromServer(url: string): Promise<string> {
    let result: NotionBlock;
    try {
      result = await this.notionRepository.getPost(url);
    } catch (error) {
      throw new Error('notion API error');
    }

    const parseMarkDown = parseNotionPostToMarkdown(result);
    return parseMarkDown;
  }

  async findPostsWithOutOfSyncByUpdatedAtField(): Promise<NotionPost[]> {
    try {
      const result: NotionPost[] = [];
      const serverPosts = await this.notionRepository.findPostsFromServer();
      const localPosts = await this.notionRepository.findPostsFromLocal();

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
      throw error || new Error();
    }
  }

  async findPostsNotYetSavedLocal(): Promise<NotionPost[]> {
    try {
      const serverPosts = await this.notionRepository.findPostsFromServer();
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
      throw error || new Error();
    }
  }

  async saveImagesFromPostString(url: string): Promise<string> {
    return axios
      .get(url, { responseType: 'arraybuffer' })
      .then(async (r) => {
        let originalFileName: string =
          r.request?._redirectable?._options?.pathname;

        originalFileName = originalFileName
          .replaceAll('/', '_')
          .replace('_secure.notion-static.com_', '');

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
    const content = await this.findPostToMarkdownFromServer(post.id);

    const postDTO: PatchPostDTO | CreatePostDTO = {
      title: post.title,
      content: content,
      notionId: post.id,
      createdAt: post.createdAt as unknown as string,
      updatedAt: post.updatedAt as unknown as string,
    };

    const imageUrls = await findImageUrlsFromRawContent(postDTO.content);
    await Promise.all(
      imageUrls.map(async (imageUrl) => {
        const savedImagePath = await this.saveImagesFromPostString(imageUrl);
        postDTO.content = postDTO.content.replace(imageUrl, savedImagePath);
      }),
    );

    return this.notionRepository.syncPost(user, postDTO, post.id);
  }
}
