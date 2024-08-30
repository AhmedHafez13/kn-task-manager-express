import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ type: 'varchar', length: 64, nullable: false })
  title!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string;

  @Column({ type: 'date', nullable: true })
  dueDate!: Date;

  @Column({ type: 'boolean', default: false })
  completed!: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user!: User;
}
