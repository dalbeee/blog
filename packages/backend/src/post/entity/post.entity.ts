import { Comment } from '@src/comments/entity/comment.entity';
import { BaseEntity } from '@src/share/entity/baseEntity';
import { Tag } from '@src/tag/tag.entity';
import { User } from '@src/user/entity/user.entity';

import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ length: 20000 })
  content: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  slug: string;

  // @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => Tag, { nullable: true })
  tags: Tag[];

  // @OneToMany(() => Upload, (upload) => upload.post)
  // uploads: Upload[];

  // @JoinColumn()
  // @OneToMany(() => Comment, (comment) => comment.post, {
  //   cascade: true,
  //   onDelete: 'SET NULL',
  // })
  // comments: Comment[];
}
