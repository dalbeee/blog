import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { User } from '@src/user/entity/user.entity';
import { Post } from './entity/post.entity';
import { CreatePostDTO, PostDTO } from './dto/post.dto';
import { PostRepository } from './post.repository';
import { getConnection, getManager } from 'typeorm';

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

  async createPost(user: User, post: CreatePostDTO): Promise<Post> {
    try {
      const newPost = this.postsRepository.createPost(user, post);

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

  async test(user: User, post: CreatePostDTO) {
    // const queryRunner = getConnection().createQueryRunner();
    // queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   const row = this.postsRepository.createPost(user, post);
    //   const result = [];
    //   await queryRunner.manager.save(row).then((r) => result.push(r));

    //   const row2 = this.postsRepository.create({
    //     title: 'null',
    //     content: 'content',
    //     description: 'd',
    //     slug: 'a',
    //   });
    //   await queryRunner.manager.save(row2).then((r) => result.push(r));

    //   await queryRunner.commitTransaction();
    //   return result;
    // } catch (error) {
    //   console.log(error.message);
    //   await queryRunner.rollbackTransaction();
    //   throw new BadRequestException(error.message);
    // } finally {
    //   await queryRunner.release();
    // }

    return await getConnection().transaction(async (manager) => {
      const row = this.postsRepository.createPost(user, post);

      try {
        const row2 = this.postsRepository.create({
          title: 'null',
          content: 'content',
          // description: 'd',
          // slug: 'a',
        });
        return await Promise.all([
          await manager.save(row),
          await manager.save(row2),
        ]);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    });
  }
}
