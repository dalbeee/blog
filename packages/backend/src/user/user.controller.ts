import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '@src/auth/decorator/currentUser.decorator';
import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { UpdateUserDTO, UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/:email')
  async findByName(@Param('email') email: string) {
    return await this.usersService.findByEmail(email);
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    return await this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:email')
  async updateUser(
    @CurrentUser() user: User,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.usersService.patchUser(user, updateUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:email')
  async deleteUser(@Param('email') email: string, @CurrentUser() user: User) {
    return await this.usersService.deleteUser(email, user);
  }
}
