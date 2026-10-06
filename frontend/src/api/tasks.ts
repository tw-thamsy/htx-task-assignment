import type { TaskDto } from '#shared/dtos/tasks/task.dto';

export async function fetchTasks(): Promise<TaskDto[]> {
  const { apiUrl } = window.APP_CONFIG;
  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/tasks`);

  if (!response.ok) {
    throw new Error(`Failed to load tasks (${response.status})`);
  }

  return response.json() as Promise<TaskDto[]>;
}
