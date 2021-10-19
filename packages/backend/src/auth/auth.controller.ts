import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@src/user/entity/user.entity';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/currentUser.decorator';
import { JwtAuthGuard } from './guard/jwtAuth.guard';
import { LocalAuthGuard } from './guard/localAuth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(@CurrentUser() user: User) {
    return this.authService.createAccessToken(user as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/validate')
  async validate(@CurrentUser() user: User) {
    return user;
  }
}
