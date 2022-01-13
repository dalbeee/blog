import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Post } from '@src/post/entity/post.entity';
import { BaseEntity } from '@src/share/entity/baseEntity';
import { User } from '@src/user/entity/user.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  body: string;

  // @JoinColumn()
  // @ManyToOne(() => User, (user) => user.comments)
  user: User;

  // @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
