import { Connection } from 'typeorm';
import { User } from './User.entity';

export const userRepository = {
  provide: 'USER_REPOSITORY',
  useFactory: (connection: Connection) => connection.getRepository(User),
  inject: ['DATABASE_CONNECTION'],
};
