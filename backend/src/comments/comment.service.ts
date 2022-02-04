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
    return await this.commentRepository.find({ relations: ['user'] });
  }

  async createCommentToPostBySlug(
    user: User,
    postSlug: string,
    comment: CommentDTO,
  ) {
    const getPostResult = await this.postRepository.findOne({
      slug: postSlug,
    });
    const commentRow = this.commentRepository.create(comment);
    commentRow.user = user;
    commentRow.post = getPostResult;

    return await this.commentRepository.save(commentRow);
  }

  async createComment(user: User, comment: CommentDTO) {
    const row = this.commentRepository.create(comment);
    row.user = user;
    return await this.commentRepository.save(row);
  }

  async deleteComment(user: User, commentId: string) {
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
  }
}
