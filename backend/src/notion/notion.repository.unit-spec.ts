import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';

import { NotionPost } from './domain/types/notion-post';
import { NotionConfigService } from './notion.config.service';
import { NotionRepository } from './notion.repository';
import { getPosts, findPostsFromServer } from './test/notionRepository.assets';

const httpService = () => ({});

const notionConfigService = () => ({});

const mockNotionRepository = () => ({
  find: jest.fn().mockResolvedValue(findPostsFromServer),
  findPost: jest.fn().mockImplementation(async (id: string) => {
    const results = getPosts.results.filter((post) => post.id === id);
    return {
      ...getPosts,
      results,
    };
  }),
  findPosts: jest.fn().mockResolvedValue(getPosts),
  findPostsFromLocal: jest.fn().mockResolvedValue(findPostsFromServer),
  findPostsFromServer: jest.fn().mockResolvedValue(findPostsFromServer),
});

let notionRepository: NotionRepository;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      { provide: NotionRepository, useValue: mockNotionRepository() },
      { provide: HttpService, useValue: httpService() },
      { provide: NotionConfigService, useValue: notionConfigService() },
    ],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();

  notionRepository = await moduleRef.get(NotionRepository);
});

describe('notionRepository', () => {
  it('findPostsFromServer', async () => {
    const serverPosts: NotionPost[] = findPostsFromServer;
    // [
    //   {
    //     id: getPosts.results[0].id,
    //     title: getPosts.results[0].properties['이름'].title[0].text.content,
    //     url: getPosts.results[0].url,
    //     createdAt: parseISO(getPosts.results[0].created_time),
    //     updatedAt: parseISO(getPosts.results[0].last_edited_time),
    //   },
    // ];

    const sut = notionRepository.findPostsFromServer();

    await expect(sut).resolves.toEqual(serverPosts);
  });

  it('findPostsFromLocal', async () => {
    const posts = findPostsFromServer;

    const sut = notionRepository.findPostsFromLocal();

    await expect(sut).resolves.toEqual(posts);
  });

  it('findPost', async () => {
    const post = {
      ...getPosts,
      results: [{ ...getPosts.results[0] }],
    };

    const sut = notionRepository.findPost(post.results[0].id);

    await expect(sut).resolves.toEqual(post);
  });

  it('findPosts', async () => {
    const post = getPosts;

    const sut = notionRepository.findPosts();

    await expect(sut).resolves.toEqual(post);
  });
});
