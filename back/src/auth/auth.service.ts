import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  // TODO implement db exception
  async validateUser({ username, password: pass }: UserRO): Promise<UserRO> {
    // try {
    const user = await this.usersService.findByName(username);
    if (!user) {
      throw new HttpException(
        { target: 'id', message: 'id not found' },
        HttpStatus.FORBIDDEN,
      );
    }
    if (user.password !== pass)
      throw new HttpException(
        { target: 'password', message: 'user info not found' },
        401,
      );
    const { password, posts, comments, ...result } = user;
    return result;
    // } catch (error) {
    //   console.dir(error);
    //   if (error instanceof HttpException) {
    //   }
    //   throw Error(error);
    // }
  }

  async login(user: UserRO) {
    const payload = { username: user.username };

    try {
      return {
        access_token: this.jwtService.sign(payload),
        username: user.username,
      };
    } catch (error) {
      throw new HttpException({ message: 'error@auth.service.login' }, 501);
    }
  }
}
