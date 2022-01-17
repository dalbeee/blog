import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Queue } from 'bull';
import { CronJob } from 'cron';

import { NotionConfigService } from './notion.config.service';

@Injectable()
export class NotionCronService {
  private cronActivate: boolean;

  constructor(
    @InjectQueue('notionSync') private notionSync: Queue,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly notionConfigService: NotionConfigService,
  ) {
    new Promise((res) => setTimeout(() => this.initCronService(), 500));
  }

  async initCronService() {
    this.cronActivate = false;

    const user = this.notionConfigService.notionUser;
    if (user) {
      this.addNotionCron();
    }
  }

  addNotionCron() {
    this.cronActivate = true;

    const job = new CronJob(`0 * * * * *`, () => {
      this.notionSync.add('syncNotionPosts');
      this.schedulerRegistry.deleteCronJob('notionCronService');
    });

    this.schedulerRegistry.addCronJob('notionCronService', job);
    job.start();
  }

  deactiveNotionCron() {
    this.cronActivate = false;
  }

  getCronActivate() {
    return this.cronActivate;
  }

  setCronActivate(state: boolean) {
    this.cronActivate = state;
  }
}
