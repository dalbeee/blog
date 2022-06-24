import { Injectable } from '@nestjs/common';

import { LoggerRepository } from './logger.repository';
import { LoggerDTO, LoggerType } from './dto/logger.dto';
import { Logger } from './entity/logger.entity';

@Injectable()
export class LoggerService {
  constructor(private readonly loggerRepository: LoggerRepository) {}

  async save(data: LoggerDTO) {
    const row = this.loggerRepository.create(data);
    const result = await this.loggerRepository.save(row);

    if (result.type === LoggerType.error) {
      const requestBody = this.convertToString(row);
    }
    return result;
  }

  convertToString(obj: Logger) {
    const { type, id, message, from } = obj;
    return `type : ${type}\nfrom : ${from}\nid : ${id}\nmessage : ${message}`;
  }
}
