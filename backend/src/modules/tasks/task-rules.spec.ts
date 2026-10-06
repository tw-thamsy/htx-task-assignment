import { BadRequestException } from '@nestjs/common';

import { Skills } from '#shared/skills.constants';

import { Developer } from '../developers/developer.entity.js';
import { throwIfCannotAssignTaskToDeveloper } from './task-rules.js';
import { Task, TaskStatus } from './task.entity.js';

describe('Task Rules', () => {
  it('allows assignment when the developer has every required skill', () => {
    const task = Task.create({
      id: 1,
      title: 'Build feature',
      status: TaskStatus.TODO,
      skillsRequired: [Skills.BACKEND, Skills.FRONTEND],
      assignedTo: null,
    });
    const developer = Developer.create({
      id: 2,
      name: 'Test Developer',
      skills: [Skills.BACKEND, Skills.FRONTEND],
    });

    expect(() => throwIfCannotAssignTaskToDeveloper(task, developer)).not.toThrow();
  });

  it('rejects assignment when the developer is missing a required skill', () => {
    const task = Task.create({
      id: 1,
      title: 'Build feature',
      status: TaskStatus.TODO,
      skillsRequired: [Skills.BACKEND, Skills.FRONTEND],
      assignedTo: null,
    });
    const developer = Developer.create({
      id: 2,
      name: 'Test Developer',
      skills: [Skills.BACKEND],
    });

    expect(() => throwIfCannotAssignTaskToDeveloper(task, developer)).toThrow(
      new BadRequestException('Developer 2 cannot be assigned to task 1'),
    );
  });

  it('allows assignment when the task has no required skills', () => {
    const task = Task.create({
      id: 1,
      title: 'Build feature',
      status: TaskStatus.TODO,
      skillsRequired: [],
      assignedTo: null,
    });
    const developer = Developer.create({
      id: 2,
      name: 'Test Developer',
      skills: [],
    });

    expect(() => throwIfCannotAssignTaskToDeveloper(task, developer)).not.toThrow();
  });
});
