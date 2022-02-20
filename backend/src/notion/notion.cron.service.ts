import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { getEnv } from '@src/share/utils/getEnv';
import { Queue } from 'bull';
import { CronJob } from 'cron';

@Injectable()
export class NotionCronService {
  private cronActivate: boolean;
  private readonly logger = new Logger(NotionCronService.name);

  constructor(
    @InjectQueue('notionSync') private notionSync: Queue,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.cronActivate = false;
    new Promise((res) =>
      setTimeout(() => {
        getEnv('NEST_CONFIG_CRON_STATUS') === 'true' && this.initCronService();
      }, 500),
    );
  }

  async initCronService() {
    this.cronActivate = true;
    this.addNotionCron();
  }

  addNotionCron() {
    const job = new CronJob(
      `${
        getEnv('NODE_ENV', 'development') === 'production' ? '0' : '*/10'
      } * * * * *`,
      () => {
        this.notionSync.add('syncNotionPosts');
        this.logger.log('del cron');
        this.schedulerRegistry.deleteCronJob('notionCronService');
      },
    );

    this.logger.log('add cron');
    this.cronActivate = true;
    this.schedulerRegistry.addCronJob('notionCronService', job);
    job.start();
  }

  deactiveNotionCron() {
    this.cronActivate = false;
    this.logger.error(`deactiveNotionCron`);
  }

  getCronActivate() {
    return this.cronActivate;
  }

  setCronActivate(state: boolean) {
    this.cronActivate = state;
  }
}
