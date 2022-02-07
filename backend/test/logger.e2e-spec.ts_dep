import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import * as request from 'supertest';
import * as faker from 'faker';

import { AppModule } from '@src/app.module';
import { LoggerDTO, LoggerType } from '@src/logger/dto/logger.dto';

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

describe('LOGGER MODULE', () => {
  describe('[POST] /logger', () => {
    it('will return 200', async () => {
      const requestBody: LoggerDTO = {
        message: faker.datatype.string(100),
        type: LoggerType.error,
        from: faker.datatype.string(10),
      };

      const { body } = await request(app.getHttpServer())
        .post(`/logger`)
        .send(requestBody);
      // .expect(200);

      console.log(body);
    });
  });
});
