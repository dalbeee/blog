import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { NotionModule } from './notion/notion.module';
import { LoggerModule } from './logger/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UnhandledExceptionsFilter } from './share/filter/unhandledException.filter';
import { HttpExceptionFilter } from './share/filter/httpException.filter';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
      validationSchema: Joi.object({
        NEST_CONFIG_DB_TYPE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.NEST_CONFIG_DB_TYPE as any,
      host: process.env.NEST_CONFIG_DB_HOST,
      port: +(process.env.NEST_CONFIG_DB_PORT as any),
      username: process.env.NEST_CONFIG_DB_USER,
      password: process.env.NEST_CONFIG_DB_PASSWORD,
      database: process.env.NEST_CONFIG_DB_DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.NEST_CONFIG_DB_REDIS_HOST,
        port: +(process.env.NEST_CONFIG_DB_REDIS_PORT as any),
      },
    }),
    ScheduleModule.forRoot(),
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
