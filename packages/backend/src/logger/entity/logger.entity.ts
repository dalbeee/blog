import { BaseEntity } from '@src/share/entity/baseEntity';
import { Column, Entity } from 'typeorm';

enum Type {
  Info,
  Warn,
  Error,
}

@Entity()
export class Logger extends BaseEntity {
  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  type: Type;
}
