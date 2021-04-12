import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { PostsModule } from './posts/post.module';
import { CommentsModule } from './comment/comment.module';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { DatabaseModule } from './db/db.module';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    UploadModule,
  ],
})
export class AppModule {}
