import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as faker from 'faker';

import { User } from '@src/user/entity/user.entity';
import { UserDTO } from '@src/user/dto/user.dto';
import { AppModule } from '@src/app.module';
import { UserRepository } from '@src/user/user.repository';
import { getUserAndJwt } from './util/getUserAndJwt';
import { getConnection } from 'typeorm';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
    providers: [UserRepository],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

afterEach(async () => await getConnection().dropDatabase());

afterAll(() => app.close());

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

  // describe('@GET /users', () => {
  //   let user: UserDTO;
  //   let token: string;

  //   beforeEach(async () => {
  //     [user, token] = await getUserAndJwt(app);
  //   });

  //   it('without JWT will return 401', async () => {
  //     await request(app.getHttpServer()).get(`/users`).expect(401);
  //   });

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
    let user: UserDTO;
    let token: string;

    beforeEach(async () => {
      [user, token] = await getUserAndJwt(app);
    });

    it('without JWT will return 401', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${user.email}`)
        .send({ email: 'test@gmail.com' })
        .expect(401);
    });

    it('change username will return 200', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${user.email}`)
        .send({
          username: 'tester',
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('change username and login will return 200', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${user.email}`)
        .send({
          username: 'testname',
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: user.password })
        .expect(200);
    });

    it('change email and login with changed email will return 200', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${user.email}`)
        .send({
          email: 'tester@email.com',
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'tester@email.com', password: user.password })
        .expect(200);
    });

    it('change password and login with changed password will return 200', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${user.email}`)
        .send({
          password: 'changedPW',
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: user.password })
        .expect(401);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: 'changedPW' })
        .expect(200);
    });

    it('change duplicated email will return 409', async () => {
      const existUser: UserDTO = {
        email: 'exist@mail.com',
        username: faker.datatype.string(10),
        password: faker.datatype.string(10),
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(existUser)
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/users/${user.email}`)
        .send({ email: existUser.email })
        .set('Authorization', `Bearer ${token}`)
        .expect(409);
    });

    it('change duplicated username will return 409', async () => {
      const existUser: UserDTO = {
        email: faker.internet.email(),
        username: 'existUser',
        password: faker.datatype.string(10),
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(existUser)
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/users/${user.email}`)
        .send({ username: existUser.username })
        .set('Authorization', `Bearer ${token}`)
        .expect(409);
    });
  });

  describe('@DELETE /users/:email : deleteUser method', () => {
    let user: UserDTO;
    let access_token: string;

    beforeEach(async () => {
      [user, access_token] = await getUserAndJwt(app);
    });

    describe('without JWT will return 401', () => {
      it('without JWT will return 401', async () => {
        await request(app.getHttpServer())
          .delete(`/users/${user.email}`)
          .expect(401);
      });

      it('with JWT will return 200', async () => {
        await request(app.getHttpServer())
          .delete(`/users/${user.email}`)
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200);
      });
    });

    it('after delete, login with same info will return 401', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${user.email}`)
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);

      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.email, password: user.password })
        .expect(401);
    });
  });
});

describe('AUTH MODULE', () => {
  describe('@POST /auth/login', () => {
    let user: UserDTO;
    let token: string;

    it('with successful login will get jwt token', async () => {
      const user: UserDTO = {
        email: faker.internet.email(),
        username: faker.datatype.string(10),
        password: faker.datatype.string(10),
      };

      await request(app.getHttpServer()).post(`/users`).send(user).expect(201);

      const { body } = await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.email, password: user.password });

      expect(body.access_token).toEqual(expect.any(String));
    });

    it('with successful login will return 200', async () => {
      const user: UserDTO = {
        email: faker.internet.email(),
        username: faker.datatype.string(10),
        password: faker.datatype.string(10),
      };

      await request(app.getHttpServer()).post(`/users`).send(user).expect(201);

      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.email, password: user.password })
        .expect(200);
    });

    it('with invalid password login will return 401', async () => {
      const user: UserDTO = {
        email: faker.internet.email(),
        username: faker.datatype.string(10),
        password: faker.datatype.string(10),
      };

      await request(app.getHttpServer()).post(`/users`).send(user).expect(201);

      await request(app.getHttpServer())
        .post(`/auth/login`)
        .send({ email: user.email, password: '123456' })
        .expect(401);
    });

    it('with invalid email login will return 401', async () => {
      const user: UserDTO = {
        email: faker.internet.email(),
        username: faker.datatype.string(10),
        password: faker.datatype.string(10),
      };

      await request(app.getHttpServer()).post(`/users`).send(user).expect(201);

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

// describe('POST MODULE', () => {
//   let user: UserDTO;
//   let token: string;

//   beforeEach(async () => {
//     [user, token] = await getUserAndJwt(app);
//   });

//   describe('helper function check', () => {
//     it('generatePost function will return 200', async () => {
//       const result = await generatePosts(app, { token });
//       console.log(result);
//     });
//   });

//   describe('@POST /posts', () => {
//     it('with valid createDTO will return 200', async () => {
//       const postDTO: PostDTO = {
//         title: 'hellos',
//         content: 'contents',
//         description: 'aa',
//         createdAt: new Date(),
//       };
//       await request(app.getHttpServer())
//         .post(`/posts`)
//         .send(postDTO)
//         .set('Authorization', `Bearer ${token}`);
//       expect(200);
//     });
//   });

//   it('test', async () => {
//     const post: CreatePostDTO = {
//       title: 'title',
//       content: 'content',
//       createdAt: new Date(),
//       description: 'desc',
//     };

//     const { body } = await request(app.getHttpServer())
//       .post(`/posts/test`)
//       .send(post)
//       .set('Authorization', `Bearer ${token}`);

//     console.log(body);
//   });
// });

// describe('NOTION MODULE', () => {
//   let user: UserDTO;
//   let token: string;

//   beforeEach(async () => {
//     [user, token] = await getUserAndJwt(app);
//   });

//   it('api will return 200', async () => {
//     await request(app.getHttpServer()).get('/notion').expect(200);
//   });

//   describe('NOTION CRAWLER', () => {
//     it('test', async () => {
//       const { body } = await request(app.getHttpServer())
//         .get('/notion/crawler')
//         .set('Authorization', `Bearer ${token}`);
//       console.log(body);
//     });
//   });
// });

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
