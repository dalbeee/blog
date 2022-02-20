import { ConnectionOptions } from 'typeorm';

const host =
  process.env.NEST_CONFIG_APP_ROLE === 'test'
    ? process.env.NEST_CONFIG_DB_URL_TEST
    : process.env.NEST_CONFIG_DB_URL;

const connectionOptions: ConnectionOptions = {
  type: process.env.NEST_CONFIG_DB_TYPE as any,
  host,
  port: parseInt(process.env.NEST_CONFIG_DB_PORT as any),
  username: process.env.NEST_CONFIG_DB_USER,
  password: process.env.NEST_CONFIG_DB_PASSWORD,
  database: process.env.NEST_CONFIG_DB_DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['./migration/*.ts'],
  cli: {
    migrationsDir: './migration',
  },
};

export default connectionOptions;
