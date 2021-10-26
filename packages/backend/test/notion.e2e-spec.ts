import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import * as request from 'supertest';

import { AppModule } from '@src/app.module';
import { UserDTO } from '@blog/core/dist/domain';
import { getUserAndJwt } from './util/getUserAndJwt';

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
  let user: UserDTO;
  let token: string;

  beforeAll(async () => {
    [user, token] = await getUserAndJwt(app);
  });

  describe('[GET] /notion/initVariables', () => {
    it('', async () => {});
  });

  describe('[GET] /notion/sync', () => {
    const items = [
      {
        key: 'NOTION_API_KEY',
        value: process.env.NOTION_API_KEY,
      },
      {
        key: 'NOTION_DATABASE_ID',
        value: process.env.NOTION_DATABASE_ID,
      },
    ];

    it('without api key return 403', async () => {
      // with empty api key, sync return 403
      await request(app.getHttpServer())
        .get(`/notion/sync`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403);
    });

    it('with valid api key return 200, true', async () => {
      // set api key
      await request(app.getHttpServer())
        .patch(`/admin/config`)
        .set('Authorization', `Bearer ${token}`)
        .send(items)
        .expect(200);

      // apply variables
      await request(app.getHttpServer())
        .get(`/notion/initVariables`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // sync return true
      await request(app.getHttpServer())
        .get(`/notion/sync`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });
});
