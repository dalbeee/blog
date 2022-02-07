import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as faker from 'faker';
import { getConnection } from 'typeorm';

import { User } from '@src/user/entity/user.entity';
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

describe('USER MODULE', () => {
  describe('@POST /users : createUser method', () => {
    const url = `/users`;

    describe('check DTO', () => {
      it('empty username will return 400', async () => {
        const userDTO: Partial<UserDTO> = {
          email: faker.internet.email(),
          password: '123456',
        };

        await request(app.getHttpServer()).post(url).send(userDTO).expect(400);
      });

      it('username.length > 20 will return 400', async () => {
        const userDTO: UserDTO = {
          email: faker.internet.email(),
          username: faker.datatype.string(25),
          password: '123456',
        };
        await request(app.getHttpServer()).post(url).send(userDTO).expect(400);
      });

      it('empty email will return 400', async () => {
        const userDTO: Partial<UserDTO> = {
          username: faker.datatype.string(10),
          password: '123456',
        };
        await request(app.getHttpServer()).post(url).send(userDTO).expect(400);
      });

      it('email.length > 30 will return 400', async () => {
        const userDTO: UserDTO = {
          email: 'asopeirjaoseirjaosiejroibuseroibusoeiru@test.net',
          username: faker.datatype.string(10),
          password: '123456',
        };
        await request(app.getHttpServer()).post(url).send(userDTO).expect(400);
      });

      it('empty password will return 400', async () => {
        const userDTO: Partial<UserDTO> = {
          email: faker.internet.email(),
          username: faker.datatype.string(10),
        };
        await request(app.getHttpServer()).post(url).send(userDTO).expect(400);
      });

      it('password.length < 6 return 400', async () => {
        const userDTO: Partial<UserDTO> = {
          email: faker.internet.email(),
          username: faker.datatype.string(10),
          password: faker.datatype.string(5),
        };
        await request(app.getHttpServer()).post(url).send(userDTO).expect(400);
      });

      it('password.length > 20 return 400', async () => {
        const userDTO: Partial<UserDTO> = {
          email: faker.internet.email(),
          username: faker.datatype.string(10),
          password: faker.datatype.string(21),
        };
        await request(app.getHttpServer()).post(url).send(userDTO).expect(400);
      });

      it('username, password field space not allow. return 400', async () => {
        const userDTO: UserDTO = {
          email: faker.internet.email(),
          username: 'test user',
          password: '123456',
        };

        await request(app.getHttpServer()).post(url).send(userDTO).expect(400);
      });
    });

    describe('with valid info', () => {
      it('will return 201 and user Object', async () => {
        const userDTO: UserDTO = {
          email: faker.internet.email(),
          username: faker.datatype.string(10),
          password: faker.datatype.string(10),
        };
        const { body } = await request(app.getHttpServer())
          .post(url)
          .send(userDTO)
          .expect(201);
        expect(body.email).toEqual(userDTO.email);
      });

      it('will not return password', async () => {
        const userDTO: UserDTO = {
          email: faker.internet.email(),
          username: faker.datatype.string(10),
          password: faker.datatype.string(10),
        };

        const { body } = await request(app.getHttpServer())
          .post(url)
          .send(userDTO)
          .expect(201);
        expect(body.password).toBeUndefined();
      });

      it('duplicate email will return 409', async () => {
        const userDTO1: UserDTO = {
          email: 'test@email.com',
          username: faker.datatype.string(10),
          password: '123456',
        };

        const userDTO2: UserDTO = {
          email: 'test@email.com',
          username: faker.datatype.string(10),
          password: '123456',
        };

        await request(app.getHttpServer()).post(url).send(userDTO1).expect(201);
        await request(app.getHttpServer()).post(url).send(userDTO2).expect(409);
      });

      it('duplicate username will return 409', async () => {
        const userDTO1: UserDTO = {
          email: faker.internet.email(),
          username: 'testuser1',
          password: '123456',
        };

        const userDTO2: UserDTO = {
          email: faker.internet.email(),
          username: 'testuser1',
          password: '123456',
        };

        await request(app.getHttpServer()).post(url).send(userDTO1).expect(201);
        await request(app.getHttpServer()).post(url).send(userDTO2).expect(409);
      });
    });
  });

  describe('@GET /users/:email : findUser method', () => {
    let results: User[] = [];

    const userFactory = (): UserDTO => ({
      email: faker.internet.email(),
      username: faker.random.alpha({ count: 10 }),
      password: faker.datatype.string(10),
    });

    beforeEach(async () => {
      const createUser = async (user: UserDTO) =>
        await request(app.getHttpServer()).post('/users').send(user);

      const users = Array.from({ length: 10 }, userFactory);

      results = await Promise.all(
        users.map(async (user) => {
          const result = await createUser(user);
          return result.body;
        }),
      );
    });

    it('find one will return 200', async () => {
      await request(app.getHttpServer())
        .get(`/users/${results[0].email}`)
        .expect(200);
    });

    it('find one will return User Object', async () => {
      await request(app.getHttpServer())
        .get(`/users/${results[0].email}`)
        .expect(results[0]);
    });
  });

  describe('@PATCH /users/:email : patchUser method', () => {
    let userAndJwt: { user: UserDTO; token: string };
    let userAndJwt2: { user: UserDTO; token: string };

    beforeAll(async () => {
      userAndJwt = await getUserAndJwt(app);
      userAndJwt2 = await getUserAndJwt(app);
    });

    it('without JWT will return 401', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${userAndJwt.user.email}`)
        .send({ email: 'test@gmail.com' })
        .expect(401);
    });

    it('change duplicated username will return 409', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${userAndJwt.user.email}`)
        .send({ username: userAndJwt2.user.username })
        .set('Authorization', `Bearer ${userAndJwt.token}`)
        .expect(409);
    });

    it('change username and login will return 200', async () => {
      const username = faker.datatype.string(10);

      await request(app.getHttpServer())
        .patch(`/users/${userAndJwt.user.email}`)
        .send({
          username,
        })
        .set('Authorization', `Bearer ${userAndJwt.token}`)
        .expect(200);

      userAndJwt.user.username = username;
    });

    it('change email and login will return 200', async () => {
      const email = faker.internet.email();

      await request(app.getHttpServer())
        .patch(`/users/${userAndJwt.user.email}`)
        .send({
          email,
        })
        .set('Authorization', `Bearer ${userAndJwt.token}`)
        .expect(200);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email, password: userAndJwt.user.password })
        .expect(200);

      userAndJwt.user.email = email;
    });

    // it('change password and login will return 200', async () => {
    //   const password = faker.datatype.string(10);
    //   console.log('>>>>>', userAndJwt.user.email);
    //   await request(app.getHttpServer())
    //     .patch(`/users/${userAndJwt.user.email}`)
    //     .send({
    //       password,
    //     })
    //     .set('Authorization', `Bearer ${userAndJwt.token}`)
    //     .expect(200);

    //   await request(app.getHttpServer())
    //     .post('/auth/login')
    //     .send({ email: userAndJwt.user.email, password })
    //     .expect(200);

    //   userAndJwt.user.password = password;
    // });

    // it('change duplicated email will return 409', async () => {
    //   await request(app.getHttpServer())
    //     .patch(`/users/${userAndJwt.user.email}`)
    //     .send({ email: userAndJwt2.user.email })
    //     .set('Authorization', `Bearer ${userAndJwt.token}`)
    //     .expect(409);
    // });
  });

  describe('@DELETE /users/:email : deleteUser method', () => {
    let userAndJwt: { user: UserDTO; token: string };

    beforeEach(async () => {
      userAndJwt = await getUserAndJwt(app);
    });

    describe('without JWT will return 401', () => {
      it('without JWT will return 401', async () => {
        await request(app.getHttpServer())
          .delete(`/users/${userAndJwt.user.email}`)
          .expect(401);
      });

      it('with JWT will return 200', async () => {
        await request(app.getHttpServer())
          .delete(`/users/${userAndJwt.user.email}`)
          .set('Authorization', `Bearer ${userAndJwt.token}`)
          .expect(200);
      });
    });

    it('after delete, login with same info will return 401', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${userAndJwt.user.email}`)
        .set('Authorization', `Bearer ${userAndJwt.token}`)
        .expect(200);

      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({
          email: userAndJwt.user.email,
          password: userAndJwt.user.password,
        })
        .expect(401);
    });
  });
});

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
