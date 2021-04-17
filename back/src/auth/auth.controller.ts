import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserRO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }: { user: UserRO }) {
    return this.authService.login(user);
  }
}
