import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@src/user/entity/user.entity';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: any): Promise<User> {
    const validatePassword = () => bcrypt.compareSync(password, user.password);

    let user: User;

    try {
      user = await this.usersService.findByEmail(username);
    } catch (error) {}

    if (!user || !validatePassword()) throw new UnauthorizedException();
    return user;
  }

  async createAccessToken(user: User) {
    const payload = { email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
