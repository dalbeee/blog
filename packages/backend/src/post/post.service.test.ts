import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '@src/user/entity/user.entity';
import { PostService } from './post.service';
import { Post } from './entity/post.entity';
import { PostRepository } from './post.repository';

const mockRepository = {};

let app: INestApplication;
let postService: PostService;
beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      PostService,
      { provide: getRepositoryToken(PostRepository), useValue: mockRepository },
    ],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
  postService = app.get<PostService>(PostService);
});

describe('hasUSerCollectionPermission', () => {
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
