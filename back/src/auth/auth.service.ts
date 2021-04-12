import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findByName(username);
      if (!user) throw Error('not found user');
      if (user.password !== pass) throw Error('password check');
      const { password, ...result } = user;
      return result;
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException({ message: error.message });
    }
  }

  async login(user: any) {
    try {
      const payload = { username: user.username };
      console.log('login payload>', payload); // {username :'name'}
      return {
        access_token: this.jwtService.sign(payload),
        username: user.username,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
