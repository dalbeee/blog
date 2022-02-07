import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getConnection } from 'typeorm';

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

describe('NOTION MODULE', () => {
  let userAndJwt: { user: UserDTO; token: string };

  beforeAll(async () => {
    userAndJwt = await getUserAndJwt(app);
  });

  describe('[GET] /notion/status', () => {
    it('', async () => {});
  });
});
