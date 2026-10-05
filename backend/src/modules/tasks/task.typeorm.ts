import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Task, TaskStatus } from './task.entity.js';

@Entity('tasks')
export class TaskTypeOrm implements Task {
  @PrimaryColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ type: 'varchar', length: 255 })
  readonly title: string;

  @Column({ type: 'varchar', length: 50 })
  readonly status: TaskStatus;

  @Column({ name: 'assigned_to', type: 'bigint', nullable: true })
  readonly assignedTo: number | null;
}