import { Body, Controller, Get, Post } from '@nestjs/common';

import { LoggerDTO } from '@blog/core/dist/domain';

import { LoggerService } from './logger.service';

@Controller('/logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  async save(@Body() data: LoggerDTO) {
    console.log(data);
    return await this.loggerService.save(data);
  }
}
