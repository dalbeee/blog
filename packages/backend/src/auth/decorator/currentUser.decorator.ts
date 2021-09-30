import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request: Request & { user: any } = await context
      .switchToHttp()
      .getRequest();
    const user = request?.user;

    if (!user) throw new UnauthorizedException();
    return user;
  },
);
