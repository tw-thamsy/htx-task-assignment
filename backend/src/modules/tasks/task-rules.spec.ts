import { BadRequestException } from '@nestjs/common';

import { Skills } from '#shared/skills.constants';

import { Developer } from '../developers/developer.entity.js';
import {
  throwIfCannotAssignTaskToDeveloper,
  throwIfNotAllSubtasksCompletedAndParentTaskStatusTransitionToDone,
} from './task-rules.js';
import { Task, TaskStatus } from './task.entity.js';

describe('Task Rules', () => {
  describe('Task Assignment', () => {
    it('allows assignment when the developer has every required skill', () => {
      const task = Task.create({
        id: 1,
        title: 'Build feature',
        status: TaskStatus.TODO,
        skillsRequired: [Skills.BACKEND, Skills.FRONTEND],
        assignedTo: null,
        subtaskOf: null,
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
        subtaskOf: null,
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
        subtaskOf: null,
      });
      const developer = Developer.create({
        id: 2,
        name: 'Test Developer',
        skills: [],
      });

      expect(() => throwIfCannotAssignTaskToDeveloper(task, developer)).not.toThrow();
    });
  });

  describe('Task Completion', () => {
    it('should throw an exception if not all subtasks are completed', () => {
      const subtasks = [
        Task.create({
          id: 2,
          title: 'Subtask 1',
          status: TaskStatus.DONE,
          skillsRequired: [],
          assignedTo: null,
          subtaskOf: 1,
        }),
        Task.create({
          id: 3,
          title: 'Subtask 2',
          status: TaskStatus.TODO,
          skillsRequired: [],
          assignedTo: null,
          subtaskOf: 1,
        }),
      ];

      expect(() =>
        throwIfNotAllSubtasksCompletedAndParentTaskStatusTransitionToDone(
          TaskStatus.DONE,
          subtasks,
        ),
      ).toThrow(new BadRequestException(`Not all subtasks are completed`));
    });

    it('should not throw an exception if all subtasks are completed', () => {
      const subtasks = [
        Task.create({
          id: 2,
          title: 'Subtask 1',
          status: TaskStatus.DONE,
          skillsRequired: [],
          assignedTo: null,
          subtaskOf: 1,
        }),
        Task.create({
          id: 3,
          title: 'Subtask 2',
          status: TaskStatus.DONE,
          skillsRequired: [],
          assignedTo: null,
          subtaskOf: 1,
        }),
      ];

      expect(() =>
        throwIfNotAllSubtasksCompletedAndParentTaskStatusTransitionToDone(
          TaskStatus.DONE,
          subtasks,
        ),
      ).not.toThrow();
    });

    it('should not throw if status is not transitioning to DONE', () => {
      const subtasks = [
        Task.create({
          id: 2,
          title: 'Subtask 1',
          status: TaskStatus.TODO,
          skillsRequired: [],
          assignedTo: null,
          subtaskOf: 1,
        }),
      ];

      expect(() =>
        throwIfNotAllSubtasksCompletedAndParentTaskStatusTransitionToDone(
          TaskStatus.TODO,
          subtasks,
        ),
      ).not.toThrow();
    });
  });
});
