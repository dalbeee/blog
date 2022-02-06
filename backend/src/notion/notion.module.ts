import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { PostModule } from '@src/post/post.module';
import { PostRepository } from '@src/post/post.repository';
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

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),
    BullModule.registerQueue({
      name: 'notionSync',
    }),
    TypeOrmModule.forFeature([PostRepository]),
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
    PostModule,
    UsersModule,
    ConfigModule,
  ],
  controllers: [NotionController],
  providers: [
    NotionService,
    NotionConfigService,
    NotionSync,
    NotionCronService,
    NotionRepository,
  ],
  exports: [NotionService],
})
export class NotionModule {}
