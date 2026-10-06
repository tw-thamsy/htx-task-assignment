import type { TaskDto } from '#shared/dtos/tasks/task.dto';
import type { TaskStatus } from '#shared/task-status.constants';

import { buildApiError } from './error';

export async function fetchTasks(): Promise<TaskDto[]> {
  const { apiUrl } = window.APP_CONFIG;
  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/tasks`);

  if (!response.ok) {
    throw await buildApiError(response, `Failed to load tasks (${response.status})`);
  }

  return response.json() as Promise<TaskDto[]>;
}

export async function updateTaskStatus(taskId: number, status: TaskStatus): Promise<void> {
  const { apiUrl } = window.APP_CONFIG;
  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/tasks/${taskId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw await buildApiError(response, `Failed to update task status (${response.status})`);
  }
}

export async function assignTask(taskId: number, developerId: number | null): Promise<void> {
  const { apiUrl } = window.APP_CONFIG;
  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/tasks/${taskId}/assign`, {
    method: 'PATCH',
    body: JSON.stringify({ assignedTo: developerId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw await buildApiError(response, `Failed to assign task (${response.status})`);
  }
}
