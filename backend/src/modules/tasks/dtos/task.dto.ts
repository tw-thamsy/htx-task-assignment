import { Task, TaskStatus } from '../task.entity.js';

export class TaskDto {
  id!: number;
  title!: string;
  status!: TaskStatus;
  assignedTo?: number | null;
}

export function toTaskDto(task: Task): TaskDto {
  const props = task.props;
  return {
    ...props,
    id: props.id ?? 0, // should never be null, default to 0 if it is
  };
}
