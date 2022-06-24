import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.NEST_CONFIG_DB_TYPE as any,
        host: process.env.NEST_CONFIG_DB_HOST,
        port: +(process.env.NEST_CONFIG_DB_PORT as any),
        username: process.env.NEST_CONFIG_DB_USER,
        password: process.env.NEST_CONFIG_DB_PASSWORD,
        database: process.env.NEST_CONFIG_DB_DATABASE_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
