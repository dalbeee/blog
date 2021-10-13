import { CacheModule, Module } from '@nestjs/common';
import { PostModule } from '@src/post/post.module';
import { NotionController } from './notion.controller';
import { NotionCrawler } from './notion.crawler';
import { NotionService } from './notion.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),
    PostModule,
  ],
  controllers: [NotionController],
  providers: [NotionService, NotionCrawler],
  exports: [NotionService],
})
export class NotionModule {}
