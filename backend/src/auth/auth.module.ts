import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@src/user/user.module';
import { AuthService } from '@src/auth/auth.service';
import { AuthController } from '@src/auth/auth.controller';
import { JwtStrategy } from '@src/auth/strategy/jwt.strategy';
import { LocalStrategy } from '@src/auth/strategy/local.strategy';
import { getEnv } from '@src/share/utils/getEnv';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: getEnv('NEST_CONFIG_AUTH_SECRET_JWT'),
      signOptions: { expiresIn: '90m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
