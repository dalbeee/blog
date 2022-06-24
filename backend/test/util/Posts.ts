import { faker } from '@faker-js/faker';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { Post } from '@src/post/entity/post.entity';
import { CreatePostDTO } from '@src/post/dto/post-create.dto';

export const generatePosts = async (
  app: INestApplication,
  { token, length = 1 }: { token: string; length?: number },
) => {
  const postDTOArray = Array.from({ length }, generatePostDTO);

  const createdPosts: Post[] = await Promise.all(
    postDTOArray.map(async (postDTO) =>
      createPostMethod(app, { post: postDTO, token }).then((r) => r.body),
    ),
  );
  return createdPosts;
};

export const createPostMethod = async (
  app,
  { post, token }: { post: CreatePostDTO; token: string },
) => {
  return await request(app.getHttpServer())
    .post(`/posts`)
    .send(post)
    .set('Authorization', `Bearer ${token}`);
};

export const generatePostDTO = (): CreatePostDTO => ({
  title: faker.datatype.string(20),
  content: faker.datatype.string(200),
  // createdAt: new Date().toISOString(),
});
