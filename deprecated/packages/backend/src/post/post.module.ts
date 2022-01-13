import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
