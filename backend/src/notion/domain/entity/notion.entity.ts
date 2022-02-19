import { BaseEntity } from '@src/share/entity/baseEntity';
import { User } from '@src/user/entity/user.entity';

import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Notion extends BaseEntity {
  @Column()
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column()
  description!: string;

  @Column({ default: null, length: 500 })
  thumbnail!: string;

  @Column()
  slug!: string;

  @Column()
  url!: string;

  @Column({ default: null })
  notionId?: string;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;
}
