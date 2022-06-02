import { getEnv } from '@src/share/utils/getEnv';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: getEnv('NEST_CONFIG_DB_HOST'),
        port: parseInt(getEnv('NEST_CONFIG_DB_PORT')),
        username: getEnv('NEST_CONFIG_DB_USER'),
        password: getEnv('NEST_CONFIG_DB_PASSWORD'),
        database: getEnv('NEST_CONFIG_DB_DATABASE_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
  },
];
