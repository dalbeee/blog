import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { PostModule } from '@src/post/post.module';
import { PostRepository } from '@src/post/post.repository';
import { NotionController } from './notion.controller';
import { NotionSync } from './notion.sync';
import { NotionService } from './notion.service';
import { AdminModule } from '@src/admin/admin.module';
import { NotionCronService } from './notion.cron.service';
import { UsersModule } from '@src/user/user.module';
import { NotionConfigService } from './notion.config.service';

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
    UsersModule,
  ],
  controllers: [NotionController],
  providers: [
    NotionService,
    NotionConfigService,
    NotionSync,
    NotionCronService,
  ],
  exports: [NotionService],
})
export class NotionModule {}
