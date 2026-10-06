import type { TaskStatus } from '../../task-status.constants.js';

export interface UpdateTaskStatusDto {
  status: TaskStatus;
}
