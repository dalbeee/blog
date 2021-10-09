import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest, * as request from 'supertest';
import * as faker from 'faker';

import { User } from '@src/user/entity/user.entity';
import { UserDTO } from '@src/user/dto/user.dto';
import { AppModule } from '@src/app.module';
import { UserRepository } from '@src/user/user.repository';

describe('userModule', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserRepository],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  afterEach(async () => userRepository.clear());

  afterAll(() => app.close());

  //

  describe('createUser method', () => {
    const url = `/users`;

    describe('with unvalid info', () => {
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
    });

    describe('with valid info', () => {
      const userDTO: UserDTO = {
        email: faker.internet.email(),
        username: faker.datatype.string(10),
        password: '123456',
      };

      it('will return 201', async () => {
        await request(app.getHttpServer()).post(url).send(userDTO).expect(201);
      });

      it('will have User Object', async () => {
        const { body } = await request(app.getHttpServer())
          .post(url)
          .send(userDTO)
          .expect(201);

        expect(body.email).toEqual(userDTO.email);
      });

      it('will not return password', async () => {
        const { body } = await request(app.getHttpServer())
          .post(url)
          .send(userDTO)
          .expect(201);
        expect(body.password).toBeUndefined();
      });

      it('duplicate will return 409', async () => {
        await request(app.getHttpServer()).post(url).send(userDTO).expect(201);
        await request(app.getHttpServer()).post(url).send(userDTO).expect(409);
      });
    });
  });

  describe('findUser method', () => {
    let user: Overwrite<request.Response, { body: User }>;
    let result: Overwrite<request.Response, { body: User }>;

    beforeEach(async () => {
      const userDTO: UserDTO = {
        email: faker.internet.email(),
        username: faker.lorem.word(10),
        password: '123456',
      };

      user = await request(app.getHttpServer()).post('/users').send(userDTO);
      result = await request(app.getHttpServer()).get(
        `/users/${user.body.username}`,
      );
    });

    it('one will success', async () => {
      expect(result.body).toBeDefined();
    });

    it('will not return password', async () => {
      expect(result.body.password).not.toBeDefined();
    });
  });

  //
  //

  describe('deleteUser method', () => {
    let userDTO: UserDTO;
    let user: Overwrite<request.Response, { body: User }>;
    type Result = Overwrite<request.Response, { body: User }>;

    beforeEach(async () => {
      userDTO = {
        email: faker.internet.email(),
        username: faker.lorem.word(10),
        password: '123456',
      };

      user = await request(app.getHttpServer()).post(`/users`).send(userDTO);
    });

    describe('authGuard test', () => {
      it('without JWT will return 401', async () => {
        await request(app.getHttpServer())
          .delete(`/users/${userDTO.email}`)
          .expect(401);
      });

      it('with JWT will return 200', async () => {
        const jwt = await request(app.getHttpServer())
          .post(`/auth/login`)
          .send({
            email: userDTO.email,
            password: userDTO.password,
          });

        await request(app.getHttpServer())
          .delete(`/users/${userDTO.email}`)
          .set('Authorization', `Bearer ${jwt.body.access_token}`)
          .expect(200);
      });
    });

    it('after delete, attempt with same info will failed to login', async () => {
      const userDTO: UserDTO = {
        email: faker.internet.email(),
        username: faker.datatype.string(10),
        password: '123456',
      };

      await request(app.getHttpServer()).post(`/users`).send(userDTO);

      const jwt = await request(app.getHttpServer()).post(`/auth/login`).send({
        email: userDTO.email,
        password: userDTO.password,
      });

      await request(app.getHttpServer())
        .delete(`/users/${userDTO.email}`)
        .set('Authorization', `Bearer ${jwt.body.access_token}`)
        .expect(200);

      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: userDTO.email, password: userDTO.password })
        .expect(404);
    });
  });

  describe('/auth/login method', () => {
    it('module was defined', async () => {
      await request(app.getHttpServer()).get(`/auth`).expect(200);
    });

    it('with successful login will get jwt token', async () => {
      const userDTO: UserDTO = {
        email: faker.internet.email(),
        username: faker.datatype.string(10),
        password: '123456',
      };

      await request(app.getHttpServer())
        .post(`/users`)
        .send(userDTO)
        .expect(201);

      const result = await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: userDTO.email, password: userDTO.password });

      expect(result.body.access_token).toBeDefined();
    });
  });
});

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
