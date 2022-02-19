import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { NotionController } from './notion.controller';
import { NotionSync } from './notion.sync';
import { NotionService } from './notion.service';
import { NotionCronService } from './notion.cron.service';
import { UsersModule } from '@src/user/user.module';
import { NotionConfigService } from './notion.config.service';
import { NotionRepository } from './notion.repository';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@src/config/config.module';
import { ConfigService } from '@src/config/config.service';
import { NotionRemoteRepository } from './notion.remoteRepository';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),
    BullModule.registerQueue({
      name: 'notionSync',
    }),
    TypeOrmModule.forFeature([NotionRepository]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const token = configService.getKeyValue('NOTION_API_KEY');
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
    ConfigModule,
  ],
  controllers: [NotionController],
  providers: [
    NotionService,
    NotionConfigService,
    NotionSync,
    NotionCronService,
    NotionRemoteRepository,
  ],
  exports: [NotionService],
})
export class NotionModule {}
