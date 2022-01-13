import { Body, Controller, Post } from '@nestjs/common';
import { LoggerDTO } from './dto/logger.dto';

import { LoggerService } from './logger.service';

@Controller('/logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  async save(@Body() data: LoggerDTO) {
    return await this.loggerService.save(data);
  }
}
