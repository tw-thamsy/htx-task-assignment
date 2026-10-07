import AddIcon from '@mui/icons-material/Add';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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

  const addSubtask = () => {
    const newCreateTaskDto: CreateTaskDto = {
      ...createTaskDto,
      subtasks: [...(createTaskDto.subtasks || []), { title: '', skillsRequired: [] }],
    };
    setCreateTaskDto(newCreateTaskDto);
    onChange(newCreateTaskDto);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
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
        <Button variant="outlined" endIcon={<AddIcon />} onClick={addSubtask}>
          Add Subtask
        </Button>
      </Box>
      <Box
        sx={{
          marginLeft: 3,
        }}
      >
        {createTaskDto.subtasks?.map((_, index) => (
          <TaskCreationFormWoSubmit
            onChange={(newSubtask) => {
              const newCreateTaskDto = { ...createTaskDto };
              newCreateTaskDto.subtasks![index] = newSubtask;
              setCreateTaskDto(newCreateTaskDto);
              onChange(newCreateTaskDto);
            }}
            showError={showError}
            isDisabled={isDisabled}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
}
