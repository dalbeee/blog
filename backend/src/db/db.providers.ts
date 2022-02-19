import { getEnv } from '@src/share/utils/getEnv';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: getEnv('DB_HOST'),
        port: parseInt(getEnv('NEST_CONFIG_DB_PORT')),
        username: getEnv('USER'),
        password: getEnv('PASSWORD'),
        database: getEnv('DATABASE'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
  },
];
