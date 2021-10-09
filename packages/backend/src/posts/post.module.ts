import { Module } from '@nestjs/common';
// import { PostsController } from './post.controller';
// import { PostsService } from './post.service';
import { postRepository } from './post.providers';

@Module({
  imports: [],
  // providers: [PostsService, postRepository],
  // controllers: [PostsController],
  // exports: [PostsService],
})
export class PostsModule {}
