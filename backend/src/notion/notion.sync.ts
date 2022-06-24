import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

import { NotionService } from './notion.service';
import { NotionCronService } from './notion.cron.service';
import { UserService } from '@src/user/user.service';

@Processor('notionSync')
export class NotionSync {
  private readonly logger = new Logger(NotionSync.name);

  constructor(
    private readonly notionService: NotionService,
    private readonly notionCronService: NotionCronService,
    private readonly userService: UserService,
  ) {}

  @OnQueueError()
  onError(err: Error) {
    this.logger.error('queue error > ', err);
  }

  @Process('syncNotionPosts')
  async syncNotionPosts(job: Job) {
    try {
      const notYetSavedPosts =
        await this.notionService.findPostsNotYetSavedLocal();

      const notYetUpdatedPosts =
        await this.notionService.findPostsWithOutOfSyncByUpdatedAtField();

      this.logger.log(
        `new-${notYetSavedPosts.length}\tnotYetSync-${notYetUpdatedPosts.length}`,
      );
      const queuePosts = notYetSavedPosts.concat(notYetUpdatedPosts);
      const userString = process.env.NEST_ADMIN_USER_EMAIL;
      const user = await this.userService.findByEmail(userString!);

      for (const [index, post] of queuePosts.entries()) {
        this.logger.log(` ${index} of ${queuePosts.length}...`);
        await this.notionService
          .syncPostToLocal(user, post)
          .then(
            async () =>
              await this.sleep(
                +(process.env.NOTION_API_THROTTLING as any) || 1000,
              ),
          );
      }
      this.notionCronService.addNotionCron();
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(error, error.message, error.stack);
      else this.logger.error(error);

      this.notionCronService.deactiveNotionCron();
    }
  }

  sleep(milliseconds: number) {
    return new Promise((res) => setTimeout(res, milliseconds));
  }
}
