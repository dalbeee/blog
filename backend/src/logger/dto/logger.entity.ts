import { BaseEntity } from '@src/share/entity/baseEntity';
import { LoggerType } from './logger.dto';

export class Logger extends BaseEntity {
  message: string;
  type: LoggerType;
  from: string;
}
