import { BeforeInsert, Column, Entity, OneToMany, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { Comment } from '@src/comments/entity/comment.entity';
import { Post } from '@src/posts/entity/post.entity';
import { BaseEntity } from '@src/share/entity/baseEntity';

@Entity()
@Unique(() => ['username', 'email'])
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @BeforeInsert()
  async convertPasswordToHash() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // @OneToMany(() => Post, (post) => post.user, { cascade: true })
  // posts: Post[];

  // @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  // comments: Comment[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
