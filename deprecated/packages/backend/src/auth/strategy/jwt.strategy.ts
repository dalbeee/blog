import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@src/user/entity/user.entity';
import { UserService } from '@src/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_JWT,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = this.userService.findByEmail(payload.email);
    return user;
  }
}
