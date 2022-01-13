import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@src/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
