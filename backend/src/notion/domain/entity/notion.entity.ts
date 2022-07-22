import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../share/entity/baseEntity';

@Entity()
export class Notion extends BaseEntity {
  @Column()
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column()
  description!: string;

  @Column()
  author!: string;

  @Column({ default: null, length: 500 })
  thumbnail?: string;

  @Column()
  slug!: string;

  @Column({ default: null })
  url?: string;
}
