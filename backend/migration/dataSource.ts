import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.development' });
}

const host =
  process.env.NEST_CONFIG_APP_ROLE === 'test'
    ? process.env.NEST_CONFIG_DB_HOST_TEST
    : process.env.NEST_CONFIG_DB_HOST;

const connectionOptions: DataSourceOptions = {
  type: process.env.NEST_CONFIG_DB_TYPE as any,
  host,
  port: parseInt(process.env.NEST_CONFIG_DB_PORT as any),
  username: process.env.NEST_CONFIG_DB_USER,
  password: process.env.NEST_CONFIG_DB_PASSWORD,
  database: process.env.NEST_CONFIG_DB_DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['./migration/sources/*.ts'],
};

export default new DataSource(connectionOptions);
