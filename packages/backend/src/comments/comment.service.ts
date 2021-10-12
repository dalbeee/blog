import { Repository } from 'typeorm';
import { HttpException, Inject, Injectable } from '@nestjs/common';

import { Post } from '@src/post/entity/post.entity';
import { User } from '@src/user/entity/user.entity';
import { CommentDTO } from './comment.dto';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private readonly commentRepository: Repository<Comment>,
    @Inject('POST_REPOSITORY') private postRepository: Repository<Post>,
  ) {}

  async getAll() {
    try {
      return await this.commentRepository.find({ relations: ['user'] });
    } catch (error) {
      console.log('error from comment > getAll', error.message);
      throw new Error(error.message);
    }
  }

  async createCommentToPostBySlug(
    user: User,
    postSlug: string,
    comment: CommentDTO,
  ) {
    try {
      const getPostResult = await this.postRepository.findOne({
        slug: postSlug,
      });
      const commentRow = this.commentRepository.create(comment);
      commentRow.user = user;
      commentRow.post = getPostResult;

      return await this.commentRepository.save(commentRow);
    } catch (error) {
      console.log('error from comment > createComment', error.message);

      throw new Error(error.message);
    }
  }

  async createComment(user: User, comment: CommentDTO) {
    try {
      const row = this.commentRepository.create(comment);
      row.user = user;
      return await this.commentRepository.save(row);
    } catch (error) {
      console.log('error from comment > createComment', error.message);

      throw new Error(error.message);
    }
  }

  async deleteComment(user: User, commentId: string) {
    try {
      const getCommentResult = await this.commentRepository.findOne(
        {
          id: commentId,
        },
        { relations: ['user'] },
      );

      if (!getCommentResult) throw new HttpException('comment not found', 400);
      if (getCommentResult.user !== user)
        throw new HttpException('authenticate error', 401);

      return await this.commentRepository.delete(commentId);
    } catch (error) {
      console.log('error from comment > createComment', error.message);
      throw new HttpException({ message: error.message }, error.status);
    }
  }
}
