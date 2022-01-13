import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@src/share/entity/baseEntity';

@Entity()
export class Config extends BaseEntity {
  @Column({ nullable: false, unique: true })
  key: string;

  @Column({ nullable: false })
  value: string;
}
