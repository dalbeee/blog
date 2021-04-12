import { Module } from '@nestjs/common';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { DatabaseModule } from 'src/db/db.module';
import { postRepository } from './post.providers';
import { userRepository } from 'src/user/user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [PostsService, postRepository, userRepository],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
