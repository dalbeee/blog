import { CacheModule, Module } from '@nestjs/common';
import { PostModule } from '@src/post/post.module';
import { NotionController } from './notion.controller';
import { NotionCrawler } from './notion.crawler';
import { NotionService } from './notion.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),

    // BullModule.registerQueue({
    //   name: 'notion',
    // }),

    PostModule,
  ],
  controllers: [NotionController],
  providers: [NotionService, NotionCrawler],
  exports: [NotionService],
})
export class NotionModule {}
