import { Category } from 'src/category/category.entity';
import { Comment } from 'src/comment/comment.entity';
import { Tag } from 'src/tag/tag.entity';
import { Upload } from 'src/upload/upload.entity';
import { User } from 'src/user/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { length: 5000 })
  content: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  slug: string;

  @CreateDateColumn({ name: 'createdAt', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Category, (category) => category.posts)
  category: Category;

  @ManyToMany(() => Tag, { nullable: true })
  tags: Tag[];

  // @OneToMany(() => Upload, (upload) => upload.post)
  // uploads: Upload[];

  @JoinColumn()
  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  comments: Comment[];
}
