import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/Post.entity';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/User.entity';
import { Repository } from 'typeorm';
import { CommentDTO } from './comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
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
    { username }: UserDTO,
    postSlug: string,
    comment: CommentDTO,
  ) {
    try {
      const getPostResult = await this.postRepository.findOne({
        slug: postSlug,
      });
      const getUserResult = await this.userRepository.findOne({ username });
      const commentRow = this.commentRepository.create(comment);
      commentRow.user = getUserResult;
      commentRow.post = getPostResult;

      return await this.commentRepository.save(commentRow);
    } catch (error) {
      console.log('error from comment > createComment', error.message);

      throw new Error(error.message);
    }
  }

  async createComment({ username }: UserDTO, comment: CommentDTO) {
    try {
      const userResult = await this.userRepository.findOne({ username });

      const row = this.commentRepository.create(comment);
      row.user = userResult;
      return await this.commentRepository.save(row);
    } catch (error) {
      console.log('error from comment > createComment', error.message);

      throw new Error(error.message);
    }
  }

  async deleteComment({ username }: UserDTO, commentId: number) {
    try {
      const getCommentResult = await this.commentRepository.findOne(
        {
          id: commentId,
        },
        { relations: ['user'] },
      );

      if (!getCommentResult) throw new HttpException('comment not found', 400);
      if (getCommentResult.user.username !== username)
        throw new HttpException('authenticate error', 401);

      return await this.commentRepository.delete(commentId);
    } catch (error) {
      console.log('error from comment > createComment', error.message);
      throw new HttpException({ message: error.message }, error.status);
    }
  }
}
