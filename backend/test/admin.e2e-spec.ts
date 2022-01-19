import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import * as request from 'supertest';

import { AppModule } from '@src/app.module';
import { getUserAndJwt } from './util/getUserAndJwt';
import { UserDTO } from '@src/user/dto/user.dto';

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

describe.only('ADMIN MODULE', () => {
  let user: UserDTO;
  let token: string;

  beforeAll(async () => {
    [user, token] = await getUserAndJwt(app);
  });

  describe('[PATCH] /admin/config', () => {
    it('success will return object', async () => {
      const patchItem = [
        {
          key: 'hello',
          value: 'world',
        },
      ];

      const { body } = await request(app.getHttpServer())
        .patch(`/admin/config`)
        .set('Authorization', `Bearer ${token}`)
        .send(patchItem)
        .expect(200);

      expect(body).toMatchObject([{ key: 'hello', value: 'world' }]);
    });
  });
});
