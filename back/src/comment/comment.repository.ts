import { Connection } from 'typeorm';
import { Comment } from './comment.entity';

export const commentRepository = {
  provide: 'COMMENT_REPOSITORY',
  useFactory: (connection: Connection) => connection.getRepository(Comment),
  inject: ['DATABASE_CONNECTION'],
};
