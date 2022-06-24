import { Test } from '@nestjs/testing';
import { User } from '@src/user/entity/user.entity';
import { faker } from '@faker-js/faker';

import { CreatePostDTO } from './domain/dto/create-post.dto';
import { NotionRemoteRepository } from './notion.remoteRepository';
import { NotionRepository } from './notion.repository';
import { posts } from './test/notionRepository.assets';

const mockNotionRepository = () => ({
  findById: jest
    .fn()
    .mockImplementation(async (id: string) =>
      posts.filter((post) => post.id === id),
    ),
  findPosts: jest.fn().mockResolvedValue(posts),
});

let notionRepository: Record<keyof NotionRepository, jest.Mock>;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      NotionRepository,
      { provide: NotionRemoteRepository, useValue: mockNotionRepository() },
    ],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();

  notionRepository = await moduleRef.get(NotionRepository);
});

describe('notionRepository', () => {
  it('findPosts', async () => {
    notionRepository.find = jest.fn().mockResolvedValue(posts);
    const findPosts = posts;

    const sut = notionRepository.findPosts();

    await expect(sut).resolves.toEqual(findPosts);
  });

  it('createPost', async () => {
    const createPostDTO: CreatePostDTO = {
      title: faker.datatype.string(10),
      content: faker.datatype.string(10),
      createdAt: faker.datatype.datetime().toISOString(),
      updatedAt: faker.datatype.datetime().toISOString(),
    };
    const user: User = new User({});
    const post = { ...createPostDTO, user: user };
    notionRepository.create = jest.fn().mockReturnValue(post);
    notionRepository.save = jest.fn().mockResolvedValue(post);

    const sut = notionRepository.createPost(user, createPostDTO);

    await expect(sut).resolves.toMatchObject(post);
  });
});
