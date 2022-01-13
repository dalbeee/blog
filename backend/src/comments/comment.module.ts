import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentsService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
