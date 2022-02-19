import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnv } from '@src/share/utils/getEnv';
import { Post } from '../post/entity/post.entity';
import { User } from '../user/entity/user.entity';
import { UsersModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: getEnv('DB_HOST'),
          port: 3306,
          username: getEnv('USER'),
          password: getEnv('PASSWORD'),
          database: getEnv('DATABASE'),
          entities: [User, Post],
          // entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Post]),

        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: getEnv('NEST_CONFIG_AUTH_SECRET_JWT'),
          signOptions: { expiresIn: '90m' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
