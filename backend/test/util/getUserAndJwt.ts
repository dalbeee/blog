import { INestApplication } from '@nestjs/common';
import { UserDTO } from '@src/user/dto/user.dto';
import { User } from '@src/user/entity/user.entity';
import * as faker from 'faker';
import * as request from 'supertest';

export const getUserAndJwt = async (
  app: INestApplication,
): Promise<{ user: UserDTO; token: string }> => {
  const user: UserDTO = {
    email: faker.internet.email(),
    username: faker.datatype.string(10),
    password: faker.datatype.string(10),
  };
  await request(app.getHttpServer()).post(`/users`).send(user);

  const jwt = await request(app.getHttpServer()).post(`/auth/login`).send({
    email: user.email,
    password: user.password,
  });

  const token = jwt.body.access_token;
  return { user, token };
};
