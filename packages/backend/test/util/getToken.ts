import * as request from 'supertest';

import { UserDTO } from '@src/user/dto/user.dto';

export const getToken = async (app, user: Partial<UserDTO>) => {
  const jwt = await request(app.getHttpServer()).post(`/auth/login`).send({
    email: user.email,
    password: user.password,
  });

  const token = jwt.body.access_token;

  return token;
};
