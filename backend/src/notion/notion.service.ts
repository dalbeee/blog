import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { writeFileSync } from 'fs';

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
    console.log('ns1');
    const serverPosts = await this.notionRemoteRepository.findPosts();
    console.log('ns2');

    const localPosts = await this.notionRepository.findPosts();
    console.log('ns3');

    serverPosts.forEach((serverPost) => {
      const isSavedPost = localPosts.some(
        (localPost) => localPost.id === serverPost.id,
      );
      !isSavedPost && result.push(serverPost);
    });
    console.log('ns4', result);
    return result;
  }

  async saveImagesFromPostString(url: string): Promise<string> {
    return axios
      .get(url, { responseType: 'arraybuffer' })
      .then(async (r) => {
        const originalFileName = (
          r.request?._redirectable?._options?.pathname as string
        )
          .split('/')
          .join('_')
          .replace('_secure.notion-static.com_', '');
        const filePath = `${process.env.NEST_CONFIG_UPLOADS_PATH}/${originalFileName}`;
        writeFileSync(filePath, r.data as any, 'utf-8');
        return originalFileName;
      })
      .catch((e) => {
        throw e || new Error('save images failed');
      });
  }

  async syncPostToLocal(post: NotionPost) {
    console.log('first');
    const content = await this.findPostToMarkdownFromServer(post.id);
    console.log('sec');
    const postDTO: PatchPostDTO | CreatePostDTO = {
      title: post.title,
      content: content,
      author: post.author,
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
    return this.notionRepository.syncPost(postDTO, post.id);
  }
}
