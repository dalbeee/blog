import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as faker from 'faker';
import { getConnection } from 'typeorm';

import { AppModule } from '@src/app.module';
import { getUserAndJwt } from './util/getUserAndJwt';
import { generatePostDTO, generatePosts } from './util/Posts';
import { Post } from '@src/post/entity/post.entity';
import { UserDTO } from '@src/user/dto/user.dto';
import { PatchPostDTO } from '@src/notion/domain/dto/patch-post.dto';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await getConnection().dropDatabase();
  await app.close();
});

describe('POST MODULE', () => {
  let user: UserDTO;
  let token: string;
  beforeAll(async () => {
    [user, token] = await getUserAndJwt(app);
  });

  describe('check functions', () => {
    it('check generatePost function', async () => {
      const post = generatePostDTO();

      await request(app.getHttpServer())
        .post(`/posts`)
        .send(post)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
    });
  });

  describe('[POST] /posts', () => {
    it('without JWT, will return 401', async () => {
      const post = generatePostDTO();

      await request(app.getHttpServer()).post(`/posts`).send(post).expect(401);
    });
    it('without title, will return 400', async () => {
      const post = {
        content: faker.datatype.string(100),
      };

      await request(app.getHttpServer())
        .post(`/posts`)
        .send(post)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });

    it('success will return 201', async () => {
      const post = generatePostDTO();

      const { body } = await request(app.getHttpServer())
        .post(`/posts`)
        .send(post)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(body).toMatchObject(post);
    });
  });

  describe('[PATCH] /posts/:postId', () => {
    let posts: Post[];

    beforeAll(async () => {
      posts = await generatePosts(app, { token, length: 1 });
    });

    it('success will return 200', async () => {
      const updatePostDTO: PatchPostDTO = {
        title: posts[0].title,
        content: faker.datatype.string(100),
        description: posts[0].description,
      };

      const { body } = await request(app.getHttpServer())
        .patch(`/posts/${posts[0].id}`)
        .send(updatePostDTO)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body.content).toEqual(updatePostDTO.content);
    });

    it('not updated field will return 200', async () => {
      const patchPostDTO = {};

      await request(app.getHttpServer())
        .patch(`/posts/${posts[0].id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(patchPostDTO)
        .expect(200);
    });
    it('wrong user attempt patch will return 403', async () => {
      const [user2, token2] = await getUserAndJwt(app);

      const patchPostDTO: PatchPostDTO = {
        title: faker.datatype.string(10),
        content: faker.datatype.string(100),
      };

      await request(app.getHttpServer())
        .patch(`/posts/${posts[0].id}`)
        .set('Authorization', `Bearer ${token2}`)
        .send(patchPostDTO)
        .expect(403);
    });
  });
});

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
