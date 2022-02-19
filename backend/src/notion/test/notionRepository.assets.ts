import * as faker from 'faker';

import { NotionPost } from '../domain/types/notion-post';

export const posts: NotionPost[] = [
  {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(10),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  },
  {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(10),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  },
];
