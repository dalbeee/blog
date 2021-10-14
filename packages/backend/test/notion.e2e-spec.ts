import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import * as request from 'supertest';

import { NotionPost } from '@blog/core/dist/notion/useCase/types';

import { AppModule } from '@src/app.module';

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

describe('NOTION MODULE', () => {
  let posts: NotionPost[];

  const expectNotionPost = {
    id: expect.any(String),
    title: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    url: expect.any(String),
  };

  describe('[GET] /notion', () => {
    it('success with ENV will return notionPost[] ', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/notion')
        .expect(200);
      expect(body).toContainEqual(expectNotionPost);
      posts = body;
    });
  });

  describe('[GET] /notion/:postId', () => {
    it('success will return notionPost', async () => {
      const { text } = await request(app.getHttpServer())
        .get(`/notion/${posts[0].id}`)
        .expect(200);

      expect(text).toEqual(expect.any(String));
    });
  });

  describe('[GET] /notion/crawler', () => {
    it('', async () => {});
  });
});
