import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { Comment } from '@src/comments/entity/comment.entity';
import { Post } from '@src/post/entity/post.entity';
import { BaseEntity } from '@src/share/entity/baseEntity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  private tempPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  private async passwordHashing() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  private async createUser() {
    await this.passwordHashing();
  }

  @BeforeUpdate()
  private async updateUser() {
    this.tempPassword !== this.password && (await this.passwordHashing());
  }

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  // @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  // comments: Comment[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
