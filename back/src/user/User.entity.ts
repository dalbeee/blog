import { Exclude } from 'class-transformer';
import { Comment } from 'src/comment/comment.entity';
import { Post } from 'src/posts/Post.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(() => ['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column()
  email: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(
    (type) => Post,
    (post) => post.user,
    //  { cascade: true }
  )
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
