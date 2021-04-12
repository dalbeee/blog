import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentDTO } from './comment.dto';
import { CommentsService } from './comment.service';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  getAll() {
    return this.commentService.getAll();
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/create')
  // test() {
  //   console.log('test');
  //   return;
  // }

  @UseGuards(JwtAuthGuard)
  @Post('/create/:postSlug')
  createCommentToPostBySlug(
    @Req() req,
    @Param('postSlug') postSlug: string,
    @Body() comment: CommentDTO,
  ) {
    return this.commentService.createCommentToPostBySlug(
      req.user,
      postSlug,
      comment,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  deleteComment(@Req() req, @Param('commentId') commentId: number) {
    return this.commentService.deleteComment(req.user, commentId);
  }
}
