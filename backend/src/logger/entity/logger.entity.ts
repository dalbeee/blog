import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../share/entity/baseEntity';

import { LoggerType } from '../dto/logger.dto';

@Entity()
export class Logger extends BaseEntity implements Logger {
  @Column()
  message!: string;

  @Column({ type: 'enum', enum: LoggerType })
  type!: LoggerType;

  @Column()
  from!: string;
}
