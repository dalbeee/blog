import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { join } from 'path/posix';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UsersModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';
import { PostModule } from './post/post.module';
import { NotionModule } from './notion/notion.module';
import { AdminModule } from './admin/admin.module';
import { LoggerModule } from './logger/logger.module';
// import { AlertModule } from './alert/alert.module';

console.log(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  'tester',
);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_URL || '10.0.0.170',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'B#q@P9fvAum2',
      database: process.env.DB_DATABASE_NAME || 'blog',
      // synchronize: process.env.NODE_ENV !== 'production',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_URL || '10.0.0.173',
        port: 6379,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    UsersModule,
    AuthModule,
    PostModule,
    NotionModule,
    AdminModule,
    LoggerModule,
    // AlertModule,
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
