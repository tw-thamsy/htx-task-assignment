import { Box, Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import type { CreateTaskDto } from '#shared/dtos/tasks/create-task.dto';

import { createTask } from '../../../api/tasks';
import ErrorSnackbar from '../../../components/ErrorSnackbar';
import TaskCreationFormWoSubmit from './TaskCreationFormWoSubmit';
import { isCreateTaskDtoValid } from './TitleInput.utils';

export default function TaskCreationForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const mutation = useMutation({
    mutationFn: (task: CreateTaskDto) => createTask(task),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await navigate('/');
    },
    onError: () => {
      setOpenSnackbar(true);
    },
  });

  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const [createTaskDto, setCreateTaskDto] = useState<CreateTaskDto>({
    title: '',
    skillsRequired: [],
  });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmittedOnce(true);
    if (!isCreateTaskDtoValid(createTaskDto) || mutation.isPending) {
      return;
    }
    setOpenSnackbar(false);
    mutation.mutate({ ...createTaskDto, title: createTaskDto.title.trim() });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <TaskCreationFormWoSubmit
        onChange={setCreateTaskDto}
        showError={hasSubmittedOnce}
        isDisabled={mutation.isPending}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={mutation.isPending}
        sx={{ alignSelf: 'flex-end' }}
      >
        Submit
      </Button>
      <ErrorSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={`Failed to create task: ${mutation.error?.message ?? ''}`}
      />
    </Box>
  );
}
