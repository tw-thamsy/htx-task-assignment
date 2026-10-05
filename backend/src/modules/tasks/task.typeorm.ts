import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.entity.js';
import { Skills } from '../skills/skills.constants.js';

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
}