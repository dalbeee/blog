import { BaseEntity } from '@src/share/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Upload extends BaseEntity {
  @Column()
  fileName!: string;

  @Column()
  path!: string;
}
