import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { UsersModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';
import { PostModule } from './post/post.module';
import { NotionModule } from './notion/notion.module';
import { LoggerModule } from './logger/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from './config/config.module';

const host =
  process.env.NEST_ROLE === 'test'
    ? process.env.NEST_CONFIG_DB_URL_TEST
    : process.env.NEST_CONFIG_DB_URL;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port: +process.env.NEST_CONFIG_DB_PORT,
      username: process.env.NEST_CONFIG_DB_USER,
      password: process.env.NEST_CONFIG_DB_PASSWORD,
      database: process.env.NEST_CONFIG_DB_DATABASE_NAME,
      // synchronize: process.env.NODE_ENV !== 'production',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.NEST_CONFIG_DB_REDIS_URL,
        port: +process.env.NEST_CONFIG_DB_REDIS_PORT,
      },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    PostModule,
    NotionModule,
    // AdminModule,
    LoggerModule,
    // AlertModule,
    ConfigModule,
  ],
  providers: [
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
