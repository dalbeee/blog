import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { PostsModule } from './posts/post.module';
import { CommentsModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { DatabaseModule } from './db/db.module';

import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './share/filter/httpException.filter';

@Module({
  imports: [
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
