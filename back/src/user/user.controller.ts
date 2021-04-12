import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findById(@Param('username') username: string) {
    return this.usersService.findByName(username);
  }

  @Post('/create')
  createUser(@Body() user: UserDTO) {
    return this.usersService.createUser(user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Put()
  // updateUser() {}

  // @UseGuards(JwtAuthGuard)
  // @Delete()
  // deleteUser(@Body() user: UserDTO) {
  //   return this.usersService.deleteUser(user);
  // }
}
