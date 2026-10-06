import { Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { DeveloperDto } from '#shared/dtos/developers/developer.dto';

import { fetchDevelopers } from '../../../api/developers';
import { assignTask } from '../../../api/tasks';
import ErrorSnackbar from '../../../components/ErrorSnackbar';

export interface AssigneeSelectProps {
  taskId: number;
  value: DeveloperDto | null;
}

export default function AssigneeSelect({ taskId, value }: AssigneeSelectProps) {
  const [assignee, setAssignee] = useState(value);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const developersQuery = useQuery({
    queryKey: ['developers'],
    queryFn: fetchDevelopers,
  });

  const mutation = useMutation({
    mutationFn: async ({
      taskId,
      newAssigneeId,
    }: {
      taskId: number;
      newAssigneeId: number | null;
    }) => {
      await assignTask(taskId, newAssigneeId);
      return { newAssigneeId };
    },
    onSuccess: ({ newAssigneeId }: { newAssigneeId: number | null }) => {
      const newAssignee = developersQuery.data?.find((dev) => dev.id === newAssigneeId) ?? null;
      setAssignee(newAssignee);
    },
    onError: () => {
      setOpenSnackbar(true);
    },
  });

  const handleChange = (event: SelectChangeEvent<number>) => {
    const newAssigneeId = event.target.value ? Number(event.target.value) : null;
    mutation.mutate({ taskId, newAssigneeId });
  };
  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={toDevId(assignee)}
        onChange={handleChange}
        disabled={mutation.isPending}
        sx={{ minWidth: 180 }}
      >
        {developersQuery.isLoading ? (
          <MenuItem key={toDevId(assignee)} value={toDevId(assignee)} disabled>
            {assignee?.name ?? ''}
          </MenuItem>
        ) : (
          developersQuery.data?.map((developer) => (
            <MenuItem key={toDevId(developer)} value={toDevId(developer)}>
              {developer.name}
            </MenuItem>
          ))
        )}
      </Select>
      <ErrorSnackbar
        open={openSnackbar}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        message={`Failed to update task assignee: ${mutation.error?.message ?? ''}`}
      />
    </>
  );
}

function toDevId(developer: DeveloperDto | null): number {
  return developer?.id ?? 0;
}
