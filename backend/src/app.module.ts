import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { UsersModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';
import { NotionModule } from './notion/notion.module';
import { LoggerModule } from './logger/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from './config/config.module';
import { UnhandledExceptionsFilter } from './share/filter/unhandledException.filter';
import { HttpExceptionFilter } from './share/filter/httpException.filter';
import { getEnv } from './share/utils/getEnv';

const host =
  getEnv('NEST_CONFIG_APP_ROLE') === 'test'
    ? getEnv('NEST_CONFIG_DB_URL_TEST')
    : getEnv('NEST_CONFIG_DB_URL');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: getEnv('NEST_CONFIG_DB_TYPE') as any,
      host,
      port: +getEnv('NEST_CONFIG_DB_PORT'),
      username: getEnv('NEST_CONFIG_DB_USER'),
      password: getEnv('NEST_CONFIG_DB_PASSWORD'),
      database: getEnv('NEST_CONFIG_DB_DATABASE_NAME'),
      // synchronize: process.env.NODE_ENV !== 'production',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    BullModule.forRoot({
      redis: {
        host: getEnv('NEST_CONFIG_DB_REDIS_URL'),
        port: +getEnv('NEST_CONFIG_DB_REDIS_PORT'),
      },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    NotionModule,
    LoggerModule,
    ConfigModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: UnhandledExceptionsFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        }),
    },
  ],
})
export class AppModule {}
