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

import { BaseEntity } from '@src/share/entity/baseEntity';
import { Role } from '@src/auth/decorator/role';
import { Notion } from '@src/notion/domain/entity/notion.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Exclude()
  @Column()
  password!: string;

  @Column({
    nullable: true,
    type: 'simple-array',
  })
  roles!: Role[];

  @Exclude()
  private tempPassword!: string;

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
    this.roles = this.roles.concat([Role.User]);
  }

  @BeforeUpdate()
  private async updateUser() {
    this.tempPassword !== this.password && (await this.passwordHashing());
  }

  @OneToMany(() => Notion, (notion) => notion.user, { cascade: true })
  posts!: Notion[];

  // @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  // comments: Comment[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
    this.roles = this.roles ?? [];
  }
}
