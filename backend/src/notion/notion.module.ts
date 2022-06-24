import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';

import { NotionController } from './notion.controller';
import { NotionSync } from './notion.sync';
import { NotionService } from './notion.service';
import { NotionCronService } from './notion.cron.service';
import { UsersModule } from '@src/user/user.module';
import { NotionRemoteRepository } from './notion.remoteRepository';
import { Notion } from './domain/entity/notion.entity';
import { NotionRepository } from './notion.repository';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),
    BullModule.registerQueue({
      name: 'notionSync',
    }),
    TypeOrmModule.forFeature([Notion]),
    HttpModule.registerAsync({
      useFactory: async () => {
        const token = process.env.NEST_NOTION_API_KEY;
        return {
          baseURL: 'https://api.notion.com/v1',
          headers: {
            'Notion-Version': '2021-08-16',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [NotionController],
  providers: [
    NotionService,
    NotionSync,
    NotionCronService,
    NotionRemoteRepository,
    NotionRepository,
  ],
  exports: [NotionService],
})
export class NotionModule {}
