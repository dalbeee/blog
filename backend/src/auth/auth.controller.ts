import {
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { HttpReturnType } from 'src';
import { UserRO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }: { user: UserRO }) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async isAuthenticated(): Promise<HttpReturnType> {
    return {
      isError: false,
      message: 'authorized',
      status: 200,
    };
  }
}
