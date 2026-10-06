import type { TaskDto } from '#shared/dtos/tasks/task.dto';

import { Task } from '../../task.entity.js';

export function toTaskDto(task: Task): TaskDto {
  const props = task.props;
  return {
    ...props,
    id: props.id ?? 0,
  };
}
