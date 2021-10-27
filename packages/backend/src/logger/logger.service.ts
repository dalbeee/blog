import { LoggerDTO } from '@blog/core/dist/domain';
import { Injectable } from '@nestjs/common';

import { LoggerRepository } from './logger.repository';

@Injectable()
export class LoggerService {
  constructor(private readonly loggerRepository: LoggerRepository) {}

  async save(data: LoggerDTO) {
    const row = this.loggerRepository.create(data);
    const result =  await this.loggerRepository.save(row);

    
  }
}
