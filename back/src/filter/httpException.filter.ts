import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { HttpReturnType } from 'src';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    this.logger.warn({ message: JSON.stringify(message), status });

    const result: HttpReturnType = {
      response: {
        isError: true,
        message: message as string,
        status,
      },
    };
    response.status(status).json(result);
  }
}
