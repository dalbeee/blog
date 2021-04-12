import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
  },
];
