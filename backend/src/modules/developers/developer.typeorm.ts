import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Skills } from '#shared/skills.constants';

@Entity('developers')
export class DeveloperTypeOrm {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number;

  @Column({ type: 'varchar', length: 255 })
  readonly name: string;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  readonly skills: Skills[];
}
