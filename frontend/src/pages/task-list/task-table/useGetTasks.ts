import { useQuery } from '@tanstack/react-query';

import type { TaskDto } from '#shared/dtos/tasks/task.dto';

interface RuntimeConfig {
  apiUrl: string;
}

async function fetchTasks(): Promise<TaskDto[]> {
  const configResponse = await fetch('/config.json');
  if (!configResponse.ok) {
    throw new Error(`Failed to load frontend config (${configResponse.status})`);
  }

  const { apiUrl } = (await configResponse.json()) as RuntimeConfig;
  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/tasks`);

  if (!response.ok) {
    throw new Error(`Failed to load tasks (${response.status})`);
  }

  return response.json() as Promise<TaskDto[]>;
}

export default function useGetTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
}
