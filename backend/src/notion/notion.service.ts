import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { writeFileSync } from 'fs';

import { User } from '@src/user/entity/user.entity';
import { NotionPost } from './domain/types/notion-post';
import { PatchPostDTO } from './domain/dto/patch-post.dto';
import { CreatePostDTO } from './domain/dto/create-post.dto';
import { NotionRepository } from './notion.repository';
import { parseNotionPostToMarkdown } from './util';
import { findImageUrlsFromRawContent } from './util/findImageUrlsFromRawContent';
import { NotionBlock } from './domain/types/notion-block';
import { NotionRemoteRepository } from './notion.remoteRepository';

@Injectable()
export class NotionService {
  private readonly logger = new Logger(NotionService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly notionRepository: NotionRepository,
    private readonly notionRemoteRepository: NotionRemoteRepository,
  ) {}

  async findPostById(id: string) {
    return await this.notionRepository.findById(id);
  }

  async findPosts() {
    return await this.notionRepository.findPosts();
  }

  async findPostToMarkdownFromServer(url: string): Promise<string> {
    let result: NotionBlock;
    try {
      result = await this.notionRemoteRepository.getRawfindPostData(url);
    } catch (error) {
      throw new Error('notion API error');
    }

    const parseMarkDown = parseNotionPostToMarkdown(result);
    return parseMarkDown;
  }

  async findPostsWithOutOfSyncByUpdatedAtField(): Promise<NotionPost[]> {
    const result: NotionPost[] = [];
    const serverPosts = await this.notionRemoteRepository.findPosts();
    const localPosts = await this.notionRepository.findPosts();

    serverPosts.forEach((serverPost) => {
      const findLocalPost = localPosts.find((localPost) => {
        return (
          localPost.id === serverPost.id &&
          localPost.updatedAt.toISOString() !==
            serverPost.updatedAt.toISOString()
        );
      });
      if (!findLocalPost) return;

      const targetNotionPost = serverPosts.find(
        (serverPost) => serverPost.id === findLocalPost.id,
      );

      targetNotionPost && result.push(targetNotionPost);
    });

    return result;
  }

  async findPostsNotYetSavedLocal(): Promise<NotionPost[]> {
    const result: NotionPost[] = [];
    const serverPosts = await this.notionRemoteRepository.findPosts();
    const localPosts = await this.notionRepository.findPosts();

    serverPosts.forEach((serverPost) => {
      const isSavedPost = localPosts.some(
        (localPost) => localPost.id === serverPost.id,
      );
      !isSavedPost && result.push(serverPost);
    });
    return result;
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

    if (!postDTO?.content) throw Error('content is null');

    const imageUrls = await findImageUrlsFromRawContent(postDTO.content);
    await Promise.all(
      imageUrls.map(async (imageUrl) => {
        const savedImagePath = await this.saveImagesFromPostString(imageUrl);
        postDTO.content = postDTO.content!.replace(imageUrl, savedImagePath);
      }),
    );

    return this.notionRepository.syncPost(user, postDTO, post.id);
  }
}
