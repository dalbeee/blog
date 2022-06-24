import { CacheModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from '@fakerjs/faker';

import { NotionPost } from './domain/types/notion-post';
import { NotionRepository } from './notion.repository';
import { NotionService } from './notion.service';
import { NotionRemoteRepository } from './notion.remoteRepository';

const mockRemoteRepository = {
  findPosts: jest.fn(),
};

const mockLocalRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
  findPosts: jest.fn(),
};

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
        useValue: mockLocalRepository,
      },
      {
        provide: NotionRemoteRepository,
        useValue: mockRemoteRepository,
      },
    ],
  }).compile();

  const app = moduleRef.createNestApplication();

  await app.init();

  notionService = moduleRef.get<NotionService>(NotionService);
});

describe('notionService', () => {
  it('findPostsWithOutOfSyncByUpdatedAtField', async () => {
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
    const targetPost = [mockServerPost[1]];
    mockLocalRepository.findPosts.mockResolvedValue(mockLocalPost);
    mockRemoteRepository.findPosts.mockResolvedValue(mockServerPost);

    const sut = notionService.findPostsWithOutOfSyncByUpdatedAtField();

    await expect(sut).resolves.toEqual(targetPost);
  });

  it('findPostsNotYetSavedLocal', async () => {
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
    const mockLocalPost: NotionPost[] = [];
    const targetPosts = mockServerPost;
    mockLocalRepository.findPosts.mockResolvedValue(mockLocalPost);
    mockRemoteRepository.findPosts.mockResolvedValue(mockServerPost);

    const sut = notionService.findPostsNotYetSavedLocal();

    await expect(sut).resolves.toEqual(targetPosts);
  });
});
