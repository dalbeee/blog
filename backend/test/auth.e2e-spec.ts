import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { getConnection } from 'typeorm';

import { AppModule } from '@src/app.module';
import { getUserAndJwt } from './util/getUserAndJwt';
import { UserDTO } from '@src/user/dto/user.dto';
import sleep from './util/sleep';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
  await sleep(1000);
});

afterAll(async () => {
  await getConnection().dropDatabase();
  await app.close();
});

describe('AUTH MODULE', () => {
  describe('@POST /auth/login', () => {
    let user: { user: UserDTO; token: string };

    beforeAll(async () => {
      user = await getUserAndJwt(app);
    });

    it('with successful login will get jwt token', async () => {
      const { body } = await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.user.email, password: user.user.password });

      expect(body.access_token).toEqual(expect.any(String));
    });

    it('with successful login will return 200', async () => {
      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.user.email, password: user.user.password })
        .expect(200);
    });

    it('with invalid password login will return 401', async () => {
      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.user.email, password: '123456' })
        .expect(401);
    });

    it('with invalid email login will return 401', async () => {
      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: 'test@gmail.com', password: user.user.password })
        .expect(401);
    });

    // it(`export util function 'getUserAndJwt' will valid`, async () => {
    //   const userAndJwt = await getUserAndJwt(app);
    //   expect(userAndJwt.token).toEqual(expect.any(String));
    // });
  });
});
