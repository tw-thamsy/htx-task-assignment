import { IsEnum } from 'class-validator';

import type { UpdateTaskStatusDto } from '#shared/dtos/tasks/update-task-status.dto';
import { TaskStatus } from '#shared/task-status.constants';

export class UpdateTaskStatusValidationDto implements UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
