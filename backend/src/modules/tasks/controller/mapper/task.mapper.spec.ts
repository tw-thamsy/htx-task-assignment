import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

import { Task } from '../../task.entity.js';
import { toTaskDto } from './task.mapper.js';

describe('Task Mapper', () => {
  it('maps a persisted task to a DTO', () => {
    const task = Task.create({
      id: 12,
      title: 'Test Task',
      status: TaskStatus.IN_PROGRESS,
      skillsRequired: [Skills.BACKEND],
      assignedTo: 7,
    });

    expect(toTaskDto(task)).toEqual({
      id: 12,
      title: 'Test Task',
      status: TaskStatus.IN_PROGRESS,
      skillsRequired: [Skills.BACKEND],
      assignedTo: 7,
    });
  });

  it('maps a null task ID to zero', () => {
    const task = Task.create({
      id: null,
      title: 'New Task',
      status: TaskStatus.TODO,
      skillsRequired: [Skills.FRONTEND],
      assignedTo: null,
    });

    expect(toTaskDto(task)).toEqual({
      id: 0,
      title: 'New Task',
      status: TaskStatus.TODO,
      skillsRequired: [Skills.FRONTEND],
      assignedTo: null,
    });
  });
});
