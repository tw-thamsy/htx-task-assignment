import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

import { Developer } from '../../../developers/developer.entity.js';
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
      subtaskOf: null,
    });

    const developer = Developer.create({ id: 7, name: 'Ada Lovelace', skills: [Skills.BACKEND] });

    expect(toTaskDto(task, developer)).toEqual({
      id: 12,
      title: 'Test Task',
      status: TaskStatus.IN_PROGRESS,
      skillsRequired: [Skills.BACKEND],
      assignedTo: {
        id: 7,
        name: 'Ada Lovelace',
        skills: [Skills.BACKEND],
      },
    });
  });

  it('maps a null task ID to zero', () => {
    const task = Task.create({
      id: null,
      title: 'New Task',
      status: TaskStatus.TODO,
      skillsRequired: [Skills.FRONTEND],
      assignedTo: null,
      subtaskOf: null,
    });

    expect(toTaskDto(task, null)).toEqual({
      id: 0,
      title: 'New Task',
      status: TaskStatus.TODO,
      skillsRequired: [Skills.FRONTEND],
      assignedTo: null,
    });
  });
});
