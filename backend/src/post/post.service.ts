import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDTO } from '@src/notion/domain/dto/create-post.dto';
import { PatchPostDTO } from '@src/notion/domain/dto/patch-post.dto';

import { User } from '@src/user/entity/user.entity';
import { Post } from './entity/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private postsRepository: PostRepository) {}

  async getAll(pageNumber = 1, take = 20) {
    const skip = (pageNumber - 1) * take;

    return await this.postsRepository.find({
      skip,
      take,

      // relations: ['user', 'comments'],
      order: { createdAt: 'DESC' },
    });
  }

  async getById(id: string): Promise<Post> {
    try {
      return await this.postsRepository.findOneOrFail(
        { id },
        { relations: ['user'] },
      );
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getBySlug(slug: string): Promise<Post> {
    return await this.postsRepository.findOneOrFail(
      { slug },
      // { relations: ['user', 'comments', 'comments.user'] },
    );
  }

  async createPost(user: User, post: CreatePostDTO): Promise<Post> {
    const newPost = this.postsRepository.createPost(user, post);
    return await this.postsRepository.save(newPost);
  }

  async patchPost(
    user: User,
    postId: string,
    updateDTO: PatchPostDTO,
  ): Promise<Post> {
    const findPost = await this.getById(postId);

    if (!this.hasUserCollectPermission(user, findPost)) {
      throw new ForbiddenException();
    }
    const updatePost: Post = Object.assign(findPost, updateDTO);
    return await this.postsRepository.save(updatePost);
  }

  hasUserCollectPermission(user: User, post: Post): boolean {
    return post.user.id === user.id;
  }

  async deletePostBySlug(slug: string) {
    return await this.postsRepository.delete({ slug });
  }
}
