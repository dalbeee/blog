import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as uuid from 'uuid';

import * as helper from '@src/share/utils';
import { User } from '@src/user/entity/user.entity';
import { extractThumbnailFromPost } from '../share/utils/extractThumbnailFromPost';
import { Post } from './entity/post.entity';
import { PostDTO } from './dto/post.dto';
import { PostRepository } from './post.providers';

@Injectable()
export class PostService {
  constructor(private postsRepository: PostRepository) {}

  async getAll() {
    return await this.postsRepository.find({
      relations: ['user', 'comments'],
      order: { createdAt: 'DESC' },
    });
  }

  async getById(id: string): Promise<Post> {
    return await this.postsRepository.findOneOrFail(
      { id },
      { relations: ['user', 'comments', 'comments.user'] },
    );
  }

  async getBySlug(slug: string): Promise<Post> {
    return await this.postsRepository.findOneOrFail(
      { slug },
      { relations: ['user', 'comments', 'comments.user'] },
    );
  }

  async createPost(user: User, post: PostDTO): Promise<Post> {
    try {
      const newPost = this.postsRepository.create(post);
      newPost.user = user;
      newPost.thumbnail = extractThumbnailFromPost(post);
      newPost.description = helper.description(post.content);

      return await this.postsRepository.save(newPost);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletePostBySlug(slug: string) {
    try {
      return await this.postsRepository.delete({ slug });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
