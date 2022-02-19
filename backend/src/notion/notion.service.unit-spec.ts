import { CacheModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { PostRepository } from '@src/post/post.repository';
import { NotionPost } from './domain/types/notion-post';
import { NotionRepository } from './notion.repository';
import { NotionService } from './notion.service';

const mockServerPost: NotionPost[] = [
  {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(10),
    url: faker.datatype.string(10),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(10),
    url: faker.datatype.string(10),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  },
];

const mockLocalPost: NotionPost[] = [
  ...mockServerPost,
  { ...mockServerPost[1], updatedAt: faker.datatype.datetime() },
];

const mockRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
  findPostsFromServer: jest.fn().mockResolvedValue(mockServerPost),
  findPostsFromLocal: jest.fn().mockResolvedValue(mockLocalPost),
});

let notionService: NotionService;
beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      CacheModule.register({
        ttl: 0,
      }),
    ],
    providers: [
      NotionService,
      {
        provide: NotionRepository,
        useValue: mockRepository(),
      },
      {
        provide: PostRepository,
        useValue: mockRepository(),
      },
    ],
  }).compile();

  const app = moduleRef.createNestApplication();

  await app.init();

  notionService = moduleRef.get<NotionService>(NotionService);
});

describe('notionService', () => {
  const targetPost = [mockServerPost[1]];

  it('findPostsWithOutOfSyncByUpdatedAtField', async () => {
    const sut = notionService.findPostsWithOutOfSyncByUpdatedAtField();

    await expect(sut).resolves.toEqual(targetPost);
  });
});
