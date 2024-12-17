import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid') // UUID
  id: string;

  // required
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  // require
  @CreateDateColumn({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 6,
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    type: 'timestamp',
    precision: 6,
    nullable: true,
  })
  deletedAt: Date | null;
}
