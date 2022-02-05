import { CacheModule, HttpException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from 'faker';
import { Repository } from 'typeorm';

import { PostModule } from '@src/post/post.module';
import { PostRepository } from '@src/post/post.repository';
import { PostService } from '@src/post/post.service';
import { NotionModule } from './notion.module';
import { NotionService } from './notion.service';
import { Post } from '@src/post/entity/post.entity';
import { NotionPost } from './domain/types/notion-post';
import { NotionBlock } from './domain/types/notion-block';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

let app: INestApplication;

let notionService: NotionService;
let mockPostRepository: MockRepository<PostRepository> = {};

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [CacheModule.register({})],
    providers: [
      NotionService,
      PostService,
      {
        provide: getRepositoryToken(PostRepository),
        useValue: mockPostRepository,
      },
    ],
  }).compile();

  app = moduleRef.createNestApplication();
  app.init();
  notionService = app.get<NotionService>(NotionService);
  mockPostRepository = app.get(getRepositoryToken(PostRepository));
});

afterAll(async () => app.close());

const mockServerPosts: NotionPost[] = [
  {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(10),
    url: faker.datatype.string(10),
    createdAt: faker.datatype.datetime().toISOString(),
    updatedAt: faker.datatype.datetime().toISOString(),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(10),
    url: faker.datatype.string(10),
    createdAt: faker.datatype.datetime().toISOString(),
    updatedAt: faker.datatype.datetime().toISOString(),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(10),
    url: faker.datatype.string(10),
    createdAt: faker.datatype.datetime().toISOString(),
    updatedAt: faker.datatype.datetime().toISOString(),
  },
];

const mockLocalPosts: Partial<Post>[] = [
  //  not yet save post is mockServerPosts[2]
  {
    // already saved post local
    id: faker.datatype.uuid(),
    notionId: mockServerPosts[0].id,
    updatedAt: new Date(mockServerPosts[0].updatedAt),
  },
  {
    // already saved post local. but not same updatedAt field.
    id: faker.datatype.uuid(),
    notionId: mockServerPosts[1].id,
    updatedAt: faker.datatype.datetime(),
  },
];

describe('getPostToString', () => {
  it('success will return any string', async () => {
    const url = 'b640af6c-a8a9-4c78-9693-acfe84ee6661';
    const result = await notionService.findPostFromServerToString(url);
    expect(result).toEqual(expect.any(String));
  });

  it('fail will return not string', async () => {
    const url = 'b640af6c-a8a9-4c78-9693-acfe84ee66611';

    await expect(notionService.findPostFromServerToString(url)).rejects.toThrow(
      HttpException,
    );
  });
});

describe('findPostsDerivedNotion', () => {
  const findAndCountLogic = (posts) => posts.filter((post) => !!post.notionId);
  mockPostRepository.findAndCount = jest
    .fn()
    .mockResolvedValue([
      findAndCountLogic(mockLocalPosts),
      findAndCountLogic(mockLocalPosts).length,
    ]);

  it('findPostsDerivedNotion', async () => {
    const result = await notionService.findPosts();
    expect(result[1]).toEqual(findAndCountLogic(mockLocalPosts).length);
  });
});

describe('findNotionPostsNotYetSavedLocal', () => {
  it('serverPosts=3, clientPosts=2, and will return remain 1 object', async () => {
    const result = await notionService.findPostsNotYetSavedLocal();
    expect(result).toEqual([mockServerPosts[2]]);
  });
});

describe('findPostsWithOutOfSyncUpdatedAtField', () => {
  it('success will return remain 1 object', async () => {
    const result = await notionService.findPostsWithOutOfSyncByUpdatedAtField();
    expect(result).toEqual([mockServerPosts[1]]);
  });
});

describe('saveOrUpdateNotionPostToLocal', () => {
  it('situation save call savePost ', async () => {});
  it('situation patch call patchPost ', async () => {});
});
