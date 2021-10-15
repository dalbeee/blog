import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { PostModule } from '@src/post/post.module';
import { PostRepository } from '@src/post/post.repository';
import { NotionController } from './notion.controller';
import { NotionCrawler } from './notion.crawler';
import { NotionService } from './notion.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),

    BullModule.registerQueue({
      name: 'notion',
    }),

    TypeOrmModule.forFeature([PostRepository]),
    PostModule,
  ],
  controllers: [NotionController],
  providers: [NotionService, NotionCrawler],
  exports: [NotionService],
})
export class NotionModule {}
