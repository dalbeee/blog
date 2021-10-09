import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '@src/user/entity/user.entity';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }: Express.Request) {
    return this.authService.createAccessToken(user as User);
  }

  @Get()
  async test() {
    return { result: true };
  }
}
