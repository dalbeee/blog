import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';

import { NotionConfigService } from './notion.config.service';
import { NotionRemoteRepository } from './notion.remoteRepository';
import { rawfindPostsData } from './test/notionRemoteRepository.assets';

const mockHttpService = {};

const mockNotionConfigService = {
  getNotionConfigByKey: jest.fn().mockReturnValue(''),
};

let notionRemoteRepository: Record<keyof NotionRemoteRepository, jest.Mock>;
let httpService: Record<keyof HttpService, jest.Mock>;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      NotionRemoteRepository,
      { provide: HttpService, useValue: mockHttpService },
      { provide: NotionConfigService, useValue: mockNotionConfigService },
    ],
  }).compile();
  const app = moduleRef.createNestApplication();
  await app.init();
  notionRemoteRepository = await moduleRef.get(NotionRemoteRepository);
  httpService = await moduleRef.get(HttpService);
});

describe('notionRemoteRepository', () => {
  it('getRawfindPostsData', async () => {
    const getRawFindPostsData = rawfindPostsData;
    notionRemoteRepository.getRawfindPostsData = jest
      .fn()
      .mockResolvedValue(getRawFindPostsData);

    const sut = notionRemoteRepository.getRawfindPostsData();

    await expect(sut).resolves.toEqual(getRawFindPostsData);
  });
});
