import { Body, Controller, Post } from '@nestjs/common';

import { LoggerDTO } from '@blog/core/dist/domain';

import { LoggerService } from './logger.service';

@Controller('/logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  async save(@Body() data: LoggerDTO) {
    return await this.loggerService.save(data);
  }
}
