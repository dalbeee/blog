import { Comment } from '@src/comments/entity/comment.entity';
import { BaseEntity } from '@src/share/entity/baseEntity';
import { Tag } from '@src/tag/tag.entity';
import { User } from '@src/user/entity/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  description: string;

  @Column({ default: null, length: 500 })
  thumbnail: string;

  @Column()
  slug: string;

  @Column({ default: null })
  notionId?: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  // @ManyToMany(() => Tag, { nullable: true })
  // tags: Tag[];

  // @OneToMany(() => Upload, (upload) => upload.post)
  // uploads: Upload[];

  // @JoinColumn()
  // @OneToMany(() => Comment, (comment) => comment.post, {
  //   cascade: true,
  //   onDelete: 'SET NULL',
  // })
  // comments: Comment[];
}
