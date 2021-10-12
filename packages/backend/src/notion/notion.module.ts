import { CacheModule, Module } from '@nestjs/common';
import { NotionController } from './notion.controller';
import { NotionService } from './notion.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),
  ],
  controllers: [NotionController],
  providers: [NotionService],
  exports: [NotionService],
})
export class NotionModule {}
