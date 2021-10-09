import { Connection } from 'typeorm';
import { Post } from './entity/post.entity';

export const postRepository = {
  provide: 'POST_REPOSITORY',
  useFactory: (connection: Connection) => connection.getRepository(Post),
  inject: ['DATABASE_CONNECTION'],
};
