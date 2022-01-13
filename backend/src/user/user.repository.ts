import { EntityRepository, Repository } from 'typeorm';

import { User } from './entity/user.entity';

// export const userRepository = {
//   provide: 'USER_REPOSITORY',
//   useFactory: (connection: Connection) => connection.getRepository(User),
//   inject: ['DATABASE_CONNECTION'],
// };

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
