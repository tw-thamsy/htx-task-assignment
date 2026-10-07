import type { TaskDto } from '#shared/dtos/tasks/task.dto';

import { toDeveloperDto } from '../../../developers/controller/mapper/developer.mapper.js';
import { Developer } from '../../../developers/developer.entity.js';
import { Task } from '../../task.entity.js';

export function toTaskDto(task: Task, assignedTo: Developer | null): TaskDto {
  const props = task.props;
  return {
    id: props.id ?? 0,
    title: props.title,
    status: props.status,
    skillsRequired: props.skillsRequired,
    assignedTo: assignedTo ? toDeveloperDto(assignedTo) : null,
  };
}
