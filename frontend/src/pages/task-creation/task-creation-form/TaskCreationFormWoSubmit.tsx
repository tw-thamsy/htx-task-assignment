import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

import type { CreateTaskDto } from '#shared/dtos/tasks/create-task.dto';
import { Skills } from '#shared/skills.constants';

import TitleInput from './TitleInput';

export default function TaskCreationFormWoSubmit({
  onChange,
  showError,
  isDisabled,
}: {
  onChange: (value: CreateTaskDto) => void;
  showError: boolean;
  isDisabled: boolean;
}) {
  const [createTaskDto, setCreateTaskDto] = useState<CreateTaskDto>({
    title: '',
    skillsRequired: [],
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <TitleInput
        value={createTaskDto.title}
        onChange={(title) => {
          const newCreateTaskDto = { ...createTaskDto, title };
          setCreateTaskDto(newCreateTaskDto);
          onChange(newCreateTaskDto);
        }}
        showError={showError}
        disabled={isDisabled}
      />
      <FormControl fullWidth disabled={isDisabled}>
        <InputLabel id="skills-label">Skills Required</InputLabel>
        <Select
          labelId="skills-label"
          multiple
          value={createTaskDto.skillsRequired}
          onChange={(e) => {
            const newCreateTaskDto = {
              ...createTaskDto,
              skillsRequired: e.target.value as Skills[],
            };
            setCreateTaskDto(newCreateTaskDto);
            onChange(newCreateTaskDto);
          }}
          label="Skills Required"
        >
          <MenuItem value={Skills.FRONTEND}>Frontend</MenuItem>
          <MenuItem value={Skills.BACKEND}>Backend</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
