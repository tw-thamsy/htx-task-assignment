import { useQuery } from '@tanstack/react-query';

import { fetchTasks } from '../../../api/tasks';

export default function useGetTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
}
