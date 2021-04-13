import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { PostsModule } from './posts/post.module';
import { CommentsModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { DatabaseModule } from './db/db.module';

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
