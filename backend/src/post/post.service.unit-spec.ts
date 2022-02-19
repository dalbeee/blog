import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { User } from '@src/user/entity/user.entity';
import { PostService } from './post.service';
import { Post } from './entity/post.entity';
import { PostRepository } from './post.repository';
import { Repository } from 'typeorm';

const mockRepository = {
  find: jest.fn(),
} as unknown as jest.MockedFunction<any>;

let app: INestApplication;
let postService: PostService;
let postRepository: Partial<Record<keyof PostRepository, jest.Mock>>;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      PostService,
      // { provide: getRepositoryToken(PostRepository), useValue: mockRepository },
      { provide: PostRepository, useValue: mockRepository },
    ],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
  postService = app.get<PostService>(PostService);
  postRepository = app.get(PostRepository);
});

describe('hasUSerCollectionPermission', () => {
  it('getAll', async () => {
    const users: Post[] = [
      { title: 'title1', id: '1', content: 'content1' },
      { title: 'title2', id: '2', content: 'content2' },
    ] as Post[];
    postRepository.find.mockResolvedValue(users);

    const sut = await postService.getAll();

    expect(sut).toEqual(users);
  });

  it('success will return true', async () => {
    const user: Partial<User> = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      username: faker.datatype.string(10),
      password: faker.datatype.string(10),
    };

    const post: Partial<Post> = {
      id: faker.datatype.uuid(),
      title: faker.datatype.string(10),
      content: faker.datatype.string(10),
      user: user as User,
    };

    const result = await postService.hasUserCollectPermission(
      user as User,
      post as Post,
    );

    expect(result).toBe(true);
  });

  it('fail will return false', async () => {
    const user: Partial<User> = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      username: faker.datatype.string(10),
      password: faker.datatype.string(10),
    };

    const user2: Partial<User> = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      username: faker.datatype.string(10),
      password: faker.datatype.string(10),
    };

    const post: Partial<Post> = {
      id: faker.datatype.uuid(),
      title: faker.datatype.string(10),
      content: faker.datatype.string(10),
      user: user2 as User,
    };

    const result = await postService.hasUserCollectPermission(
      user as User,
      post as Post,
    );

    expect(result).toBe(false);
  });
});
