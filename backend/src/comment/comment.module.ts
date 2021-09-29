import { Module } from '@nestjs/common';
import { postRepository } from 'src/posts/post.providers';
import { commentRepository } from 'src/comment/comment.repository';
import { userRepository } from 'src/user/user.repository';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { DatabaseModule } from 'src/db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    commentRepository,
    userRepository,
    postRepository,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
