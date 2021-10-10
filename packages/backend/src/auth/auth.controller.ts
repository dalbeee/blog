import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '@src/user/entity/user.entity';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/currentUser.decorator';
import { LocalAuthGuard } from './guard/localAuth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@CurrentUser() user: User) {
    return this.authService.createAccessToken(user as User);
  }
}
