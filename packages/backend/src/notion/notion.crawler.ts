import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { Logger } from '@nestjs/common';

import { NotionPost } from '@blog/core/dist/notion/useCase/types';

import { CreatePostDTO, PatchPostDTO } from '@src/post/dto/post.dto';
import { PostService } from '@src/post/post.service';
import { User } from '@src/user/entity/user.entity';
import { NotionService } from './notion.service';

@Processor('notion')
export class NotionCrawler {
  private readonly logger = new Logger(NotionCrawler.name);

  constructor(
    private readonly postService: PostService,
    private readonly notionService: NotionService,
  ) {}

  @Process('getNotionPost')
  async getDBService(job: Job) {
    this.logger.debug('Start transcoding...');

    const notionDB = job.data.notionDB;

    for (const post of notionDB) {
      await this.saveOrUpdateNotionPostToLocalDB(job.data.user, post).then(
        this.sleep.bind(null, 1000),
      );
    }
    this.logger.debug('Transcoding completed');
  }

  async saveOrUpdateNotionPostToLocalDB(user: User, post: NotionPost) {
    const getPost = await this.notionService.getPostToString(post.id);

    const postDTO: PatchPostDTO | CreatePostDTO = {
      title: post.title,
      content: getPost,
      notionId: post.id,
      createdAt: post.createdAt as unknown as string,
      updatedAt: post.updatedAt as unknown as string,
    };

    try {
      await this.postService.getByNotionId(post.id);
      await this.postService.patchPost(user, post.id, postDTO as PatchPostDTO);
    } catch (error) {}

    await this.postService.createPost(user, postDTO as CreatePostDTO);
  }

  sleep(milliseconds: number) {
    return new Promise((res) => setTimeout(res, milliseconds));
  }
}
