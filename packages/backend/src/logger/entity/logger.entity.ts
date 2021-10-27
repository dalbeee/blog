import { Column, Entity } from 'typeorm';

import { Logger as LoggerEntity, LoggerType } from '@blog/core/dist/domain';

import { BaseEntity } from '@src/share/entity/baseEntity';

@Entity()
export class Logger extends BaseEntity implements LoggerEntity {
  @Column()
  message: string;

  @Column({ type: 'enum', enum: LoggerType })
  type: LoggerType;

  @Column()
  from: string;
}
