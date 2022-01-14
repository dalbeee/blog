import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.NEST_CONFIG_DB_PORT) || 3306,
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
  },
];
