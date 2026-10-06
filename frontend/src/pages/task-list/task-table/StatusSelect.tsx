import { Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { TaskStatus } from '#shared/task-status.constants';

import { updateTaskStatus } from '../../../api/tasks';
import ErrorSnackbar from '../../../components/ErrorSnackbar';

export interface StatusSelectProps {
  taskId: number;
  value: TaskStatus;
}

export default function StatusSelect({ taskId, value }: StatusSelectProps) {
  const [status, setStatus] = useState(value);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ taskId, newStatus }: { taskId: number; newStatus: TaskStatus }) => {
      await updateTaskStatus(taskId, newStatus);
      return { newStatus };
    },
    onSuccess: ({ newStatus }: { newStatus: TaskStatus }) => {
      setStatus(newStatus);
    },
    onError: () => {
      setOpenSnackbar(true);
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value as TaskStatus;
    mutation.mutate({ taskId, newStatus });
  };
  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        onChange={handleChange}
        disabled={mutation.isPending}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
        <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
        <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
      </Select>
      <ErrorSnackbar
        open={openSnackbar}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        message={`Failed to update task status: ${mutation.error?.message ?? ''}`}
      />
    </>
  );
}
