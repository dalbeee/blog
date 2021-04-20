import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { PostsModule } from './posts/post.module';
import { CommentsModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { DatabaseModule } from './db/db.module';

import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/httpException.filter';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: './log/error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: './log/combined.log' }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.simple(),
            utilities.format.nestLike(),
          ),
        }),
      ],
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    UploadModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
