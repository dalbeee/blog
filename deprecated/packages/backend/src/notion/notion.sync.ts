import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { Logger } from '@nestjs/common';

import { NotionPost } from '@blog/core/dist/notion/useCase/types';

import { User } from '@src/user/entity/user.entity';
import { NotionService } from './notion.service';

@Processor('notionSync')
export class NotionSync {
  private readonly logger = new Logger(NotionSync.name);

  constructor(private readonly notionService: NotionService) {}

  @OnQueueError()
  onError(err: Error) {
    console.error(err); // <<<<<<
  }

  @Process('syncNotionPosts')
  async getDBService(job: Job<{ user: User; queuePosts: NotionPost[] }>) {
    console.log('>>>>>>>>>>');
    this.logger.debug('Start getNotion...');

    const queuePosts = job.data.queuePosts;

    console.log(queuePosts);

    for (const [index, post] of queuePosts.entries()) {
      console.log(` ${index} of ${queuePosts.length}...`);
      await this.notionService
        .syncPostToLocal(job.data.user, post)
        .then((r) => console.log(r))
        .then(this.sleep.bind(null, process.env.NOTION_API_THROTTLING || 1000));
    }
    this.logger.debug('getNotion completed');
  }

  sleep(milliseconds: number) {
    return new Promise((res) => setTimeout(res, milliseconds));
  }
}
