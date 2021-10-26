import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { PostModule } from '@src/post/post.module';
import { PostRepository } from '@src/post/post.repository';
import { NotionController } from './notion.controller';
import { NotionSync } from './notion.sync';
import { NotionService } from './notion.service';
import { AdminModule } from '@src/admin/admin.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
    }),

    BullModule.registerQueue({
      name: 'notionSync',
    }),

    TypeOrmModule.forFeature([PostRepository]),
    PostModule,
    AdminModule,
  ],
  controllers: [NotionController],
  providers: [NotionService, NotionSync],
  exports: [NotionService],
})
export class NotionModule {}
