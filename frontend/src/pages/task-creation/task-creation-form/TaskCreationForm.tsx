import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import type { CreateTaskDto } from '#shared/dtos/tasks/create-task.dto';
import { Skills } from '#shared/skills.constants';

import { createTask } from '../../../api/tasks';
import ErrorSnackbar from '../../../components/ErrorSnackbar';
import TitleInput, { validateTitle } from './TitleInput';

export default function TaskCreationForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Skills[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const trimmedTitle = title.trim();

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmittedOnce(true);
    if (validateTitle(title) || mutation.isPending) {
      return;
    }
    setOpenSnackbar(false);
    mutation.mutate({ title: trimmedTitle, skillsRequired: selectedSkills });
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
      <TitleInput
        value={title}
        onChange={setTitle}
        showError={hasSubmittedOnce}
        disabled={mutation.isPending}
      />
      <FormControl fullWidth disabled={mutation.isPending}>
        <InputLabel id="skills-label">Skills Required</InputLabel>
        <Select
          labelId="skills-label"
          multiple
          value={selectedSkills}
          onChange={(e) => setSelectedSkills(e.target.value as Skills[])}
          label="Skills Required"
        >
          <MenuItem value={Skills.FRONTEND}>Frontend</MenuItem>
          <MenuItem value={Skills.BACKEND}>Backend</MenuItem>
        </Select>
      </FormControl>
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
