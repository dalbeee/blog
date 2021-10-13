import * as faker from 'faker';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { CreatePostDTO } from '@src/post/dto/post.dto';
import { Post } from '@src/post/entity/post.entity';
import { getUserAndJwt } from './getUserAndJwt';

export const generatePosts = async (
  app: INestApplication,
  { token, length = 1 }: { token: string; length?: number },
) => {
  const postDTO = (): CreatePostDTO => ({
    title: faker.datatype.string(20),
    content: faker.datatype.string(200),
    createdAt: new Date(),
  });

  const createPostMethod = async (post: CreatePostDTO) =>
    await request(app.getHttpServer())
      .post(`/posts`)
      .send(postDTO)
      .set('Authorization', `Bearer ${token}`);

  const postDTOArray = Array.from({ length }, postDTO);

  const createdPosts: Post[] = await Promise.all(
    postDTOArray.map(async (postDTO) =>
      createPostMethod(postDTO).then((r) => r.body),
    ),
  );

  return createdPosts;
};
