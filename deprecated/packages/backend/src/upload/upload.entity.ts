import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @CreateDateColumn({ name: 'createdAt', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updatedAt', type: 'datetime' })
  updatedAt: Date;
}
