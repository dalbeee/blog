import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

import { NotionService } from './notion.service';
import { NotionCronService } from './notion.cron.service';
import { NotionConfigService } from './notion.config.service';

@Processor('notionSync')
export class NotionSync {
  private readonly logger = new Logger(NotionSync.name);

  constructor(
    private readonly notionService: NotionService,
    private readonly notionCronService: NotionCronService,
    private readonly notionConfigService: NotionConfigService,
  ) {}

  @OnQueueError()
  onError(err: Error) {
    this.logger.error(err);
  }

  @Process('syncNotionPosts')
  async getDBService(job: Job) {
    this.logger.log('Start notionSync...');

    if (!this.checkVariables()) {
      this.logger.error('notionSync failed : variables not set');
      return;
    }

    const notYetSavedPosts =
      await this.notionService.findPostsNotYetSavedLocal();

    const notYetUpdatedPosts =
      await this.notionService.findPostsWithOutOfSyncByUpdatedAtField();

    this.logger.log(
      `new-${notYetSavedPosts.length}\tnotYetSync-${notYetUpdatedPosts.length}`,
    );

    const queuePosts = notYetSavedPosts.concat(notYetUpdatedPosts);
    const user = await this.notionConfigService.notionUser();

    try {
      for (const [index, post] of queuePosts.entries()) {
        this.logger.log(` ${index} of ${queuePosts.length}...`);
        await this.notionService
          .syncPostToLocal(user, post)
          // .then((r) => console.log(r))
          .then(
            this.sleep.bind(null, process.env.NOTION_API_THROTTLING || 1000),
          )
          .catch((e) => {
            this.logger.debug(e);
          });
      }
      this.logger.log('notionSync completed');
      this.notionCronService.addNotionCron();
    } catch (error) {
      this.notionCronService.deactiveNotionCron();
      this.logger.error('notionSync failed', error);
    }
  }

  checkVariables() {
    const env = this.notionConfigService;
    const result = env.notionApiKey && env.notionDatabaseId ? true : false;
    return result;
  }

  sleep(milliseconds: number) {
    return new Promise((res) => setTimeout(res, milliseconds));
  }
}
