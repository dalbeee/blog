import { Module } from '@nestjs/common';

import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
