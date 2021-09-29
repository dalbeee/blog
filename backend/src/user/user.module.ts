import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/db/db.module';
import { userRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserService, userRepository],
  exports: [UserService],
})
export class UsersModule {}
