import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

@Entity('tasks')
export class TaskTypeOrm {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number;

  @Column({ type: 'varchar', length: 255 })
  readonly title: string;

  @Column({ type: 'varchar', length: 50 })
  readonly status: TaskStatus;

  @Column({ name: 'skills_required', type: 'jsonb', default: () => "'[]'::jsonb" })
  readonly skillsRequired: Skills[];

  @Column({ name: 'assigned_to', type: 'bigint', nullable: true })
  readonly assignedTo: number | null;

  @Column({ name: 'subtask_of', type: 'bigint', nullable: true })
  readonly subtaskOf: number | null;
}
