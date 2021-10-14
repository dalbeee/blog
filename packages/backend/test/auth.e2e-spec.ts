import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { getConnection } from 'typeorm';

import { UserDTO } from '@src/user/dto/user.dto';
import { AppModule } from '@src/app.module';
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

describe('AUTH MODULE', () => {
  describe('@POST /auth/login', () => {
    let user: UserDTO;
    let token: string;

    beforeAll(async () => {
      [user, token] = await getUserAndJwt(app);
    });

    it('with successful login will get jwt token', async () => {
      const { body } = await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.email, password: user.password });

      expect(body.access_token).toEqual(expect.any(String));
    });

    it('with successful login will return 200', async () => {
      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.email, password: user.password })
        .expect(200);
    });

    it('with invalid password login will return 401', async () => {
      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.email, password: '123456' })
        .expect(401);
    });

    it('with invalid email login will return 401', async () => {
      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: 'test@gmail.com', password: user.password })
        .expect(401);
    });

    it(`export util function 'getUserAndJwt' will valid`, async () => {
      [user, token] = await getUserAndJwt(app);
      expect(token).toEqual(expect.any(String));
    });
  });
});

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
