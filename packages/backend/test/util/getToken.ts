import * as request from 'supertest';

import { UserDTO } from '@blog/core/dist/domain';

export const getToken = async (app, user: Partial<UserDTO>) => {
  const jwt = await request(app.getHttpServer()).post(`/auth/login`).send({
    email: user.email,
    password: user.password,
  });

  const token = jwt.body.access_token;

  return token;
};
