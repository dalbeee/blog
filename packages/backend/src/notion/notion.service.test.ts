import { CacheModule, HttpException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from 'faker';
import { Repository } from 'typeorm';

import { NotionPost } from '@blog/core/dist/notion/useCase/types';

import { PostModule } from '@src/post/post.module';
import { PostRepository } from '@src/post/post.repository';
import { PostService } from '@src/post/post.service';
import { NotionModule } from './notion.module';
import { NotionService } from './notion.service';
import { Post } from '@src/post/entity/post.entity';
import { NotionBlock } from '@blog/core/dist/notion/repository/types';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

let app: INestApplication;

let notionService: NotionService;
let mockPostRepository: MockRepository<PostRepository> = {};

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [CacheModule.register({})],
    providers: [
      NotionService,
      // CacheModule,
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
];

const mockLocalPosts: Partial<Post>[] = [
  {
    // already saved post local
    // ... and not yet save post is mockServerPosts[1]
    id: faker.datatype.uuid(),
    notionId: mockServerPosts[0].id,
  },
];

const mockServerBlocks: NotionBlock[] = [
  {
    object: 'lists',
    results: [
      {
        object: 'block',
        id: 'f03e0701-fbfc-4771-a5d7-d03b4a470619',
        created_time: '2021-04-12T15:46:00.000Z',
        last_edited_time: '2021-04-12T16:20:00.000Z',
        has_children: false,
        archived: false,
        type: 'paragraph',
        paragraph: {
          text: [
            {
              type: 'text',
              text: {
                content: '이 문서',
                link: {
                  url: 'https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly',
                },
              },
              plain_text: '이 문서',
              href: 'https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly',
            },
            {
              type: 'text',
              text: {
                content:
                  ' 에 따르면 next.js 의 서버사이드에서 api 요청을 보낼때는 클라이언트 측에서 보내는것이 아니기 때문에, url 을 다르게 설정해야합니다. 브라우저에서 요청하는것과 달리, ssr나 ssg 는 next.js 에서 요청을 보내기때문에, 같은 목적지를 가진 api를 요청한다고 해도 주소가 달라지겠죠?😊 ',
                link: null,
              },
              plain_text:
                ' 에 따르면 next.js 의 서버사이드에서 api 요청을 보낼때는 클라이언트 측에서 보내는것이 아니기 때문에, url 을 다르게 설정해야합니다. 브라우저에서 요청하는것과 달리, ssr나 ssg 는 next.js 에서 요청을 보내기때문에, 같은 목적지를 가진 api를 요청한다고 해도 주소가 달라지겠죠?😊 ',
              href: null,
            },
          ],
        },
      },
    ],
  },
];

// const getPostToStringLogic = (targetId) =>
//   mockServerPosts.find((post) => post.id === targetId);

// notionService.getPostToString = jest.fn();

describe('getPostToString', () => {
  it('success will return any string', async () => {
    const url = 'b640af6c-a8a9-4c78-9693-acfe84ee6661';
    const result = await notionService.getPostToString(url);
    expect(result).toEqual(expect.any(String));
  });

  it('fail will return not string', async () => {
    const url = 'b640af6c-a8a9-4c78-9693-acfe84ee66611';

    await expect(notionService.getPostToString(url)).rejects.toThrow(
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
    const result = await notionService.findPostsDerivedNotion();
    expect(result[1]).toEqual(findAndCountLogic(mockLocalPosts).length);
  });
});

describe('findNotionPostsNotYetSavedLocal', () => {
  it('serverPosts=2, clientPosts=1, and will return remain 1 object', async () => {
    notionService.getPostsFromServer = jest
      .fn()
      .mockResolvedValue(mockServerPosts);

    const result = await notionService.findNotionPostsNotYetSavedLocal();
    expect(result).toEqual([mockServerPosts[1]]);
  });
});

describe('saveOrUpdateNotionPostToLocal', () => {
  it('situation save call savePost ', async () => {});
  it('situation patch call patchPost ', async () => {});
});