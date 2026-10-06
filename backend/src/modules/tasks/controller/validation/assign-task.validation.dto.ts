import { IsInt, Min } from 'class-validator';

import type { AssignTaskDto } from '#shared/dtos/tasks/assign-task.dto';

export class AssignTaskValidationDto implements AssignTaskDto {
  @IsInt()
  @Min(1)
  assignedTo!: number;
}
