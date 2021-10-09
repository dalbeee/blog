import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '@src/auth/decorator/currentUser.decorator';
import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':username')
  findByName(@Param('username') username: string) {
    return this.usersService.findByName(username);
  }

  @Post()
  createUser(@Body() user: UserDTO) {
    return this.usersService.createUser(user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Put()
  // updateUser() {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:email')
  deleteUser(@Param('email') email: string, @CurrentUser() user: User) {
    return this.usersService.deleteUser(email, user);
  }
}
