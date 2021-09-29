import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/User.entity';
import * as helper from 'src/utils';
import { QueryFailedError, Repository } from 'typeorm';
import { PostDTO } from './dto/post.dto';
import { Post } from './Post.entity';

import * as uuid from 'uuid';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY') private postsRepository: Repository<Post>,
    @Inject('USER_REPOSITORY') private usersRepository: Repository<User>,
  ) {}

  async getAll() {
    try {
      this.postsRepository.find({});
      return await this.postsRepository.find({
        relations: ['user', 'comments'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      console.log('error from posts > getAll', error.message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const getPostResult = await this.postsRepository.findOne(
        { id },

        { relations: ['user', 'comments', 'comments.user'] },
      );

      // const getPostResultByBuilder = await this.postsRepository
      //   .createQueryBuilder('post')
      //   .where('post.id = :id', { id })
      //   .leftJoinAndSelect('post.user', 'user')
      //   .leftJoinAndSelect('post.comments', 'comment')
      //   .leftJoinAndSelect('comments.user', 'user')
      //   .getMany();

      // console.log(getPostResultByBuilder);
      // return getPostResultByBuilder;

      return getPostResult;
    } catch (error) {
      console.log('error from posts > getById', error.message);
      const message = [];
      if (error instanceof QueryFailedError)
        message.push({ message: 'post not found', status: 400 });

      throw new HttpException({ message }, error.status);
    }
  }

  async getBySlug(slug: string): Promise<any> {
    try {
      const getPostResult = await this.postsRepository.findOne(
        { slug },
        { relations: ['user', 'comments', 'comments.user'] },
      );

      return getPostResult;
    } catch (error) {
      console.log('error from posts > getBySlug', error.message);

      const message = [];
      if (error instanceof QueryFailedError)
        message.push({ message: 'post not found', status: 400 });

      throw new HttpException({ message }, error.status);
    }
  }

  // TODO slug에 uuid 들어간것 수정하기
  async createPost({ username }: JwtPayload, post: PostDTO): Promise<any> {
    // TODO check
    const regexSelectImage = /!\[.*?\]\((.*?)\)g/;

    try {
      console.log(' from posts > createPost', post);

      const userResult = await this.usersRepository.findOne({ username });

      const newPost = this.postsRepository.create(post);
      newPost.user = userResult;
      // newPost.slug = helper.slugify(post.title);
      newPost.slug = uuid.v4();

      // get thumbnail from content
      try {
        const thumbnail = post.content
          .match(/!\[.*?\]\((.*?\))/g)[0]
          .replace(/!\[.*?\]\((.*?)\)/, '$1');
        console.log(thumbnail);
        newPost.thumbnail = thumbnail;
      } catch (error) {
        console.log(error.messsage);
        newPost.thumbnail = '';
      }
      newPost.description = helper.description(post.content);

      return await this.postsRepository.save(newPost);
    } catch (error) {
      console.log('error from posts > createPost', error.message);
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async deletePostBySlug(slug: string) {
    try {
      return await this.postsRepository.delete({ slug });
    } catch (error) {
      console.log('error from posts > deletePostBySlug', error.message);
    }
  }
  // async deletePost(id: number) {
  //   try {
  //     return await this.postsRepository.delete({ id });
  //   } catch (error) {
  //     console.log('error from posts > deletePost', error.message);
  //   }
  // }
}
