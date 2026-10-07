import { Mocked } from 'vitest';

import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

import { DeveloperService } from '../developers/developer.service.js';
import { SkillClassifier } from '../skill-classifier/skill-classifier.js';
import { Task } from './task.entity.js';
import { TaskRepository } from './task.repository.js';
import { TaskService } from './task.service.js';

describe('TaskService.createTask', () => {
  let createTask: Mocked<TaskRepository>['createTask'];
  let classify: ReturnType<typeof vi.fn<SkillClassifier['classify']>>;
  let service: TaskService;

  beforeEach(() => {
    classify = vi.fn<SkillClassifier['classify']>();
    createTask = vi.fn<(task: Task) => Promise<Task>>(async (task) => {
      task.setId(Math.floor(Math.random() * 1000));
      return task;
    });
    const repo = {
      createTask,
    } as unknown as Mocked<TaskRepository>;
    service = new TaskService(repo, {} as DeveloperService, { classify } as SkillClassifier);
  });

  it('uses the provided skills without calling the classifier', async () => {
    const tasks = await service.createTaskAndSubtasks({
      title: 'Build login page',
      skillsRequired: [Skills.FRONTEND],
    });

    expect(classify).not.toHaveBeenCalled();
    expect(tasks[0].props).toEqual({
      id: expect.any(Number),
      title: 'Build login page',
      status: TaskStatus.TODO,
      skillsRequired: [Skills.FRONTEND],
      assignedTo: null,
      subtaskOf: null,
    });
  });

  it.each([
    ['omitted', undefined],
    ['empty', []],
  ])('classifies skills from the title when skills are %s', async (_, skillsRequired) => {
    classify.mockResolvedValue([Skills.BACKEND, Skills.FRONTEND]);

    const tasks = await service.createTaskAndSubtasks({
      title: 'Build login flow',
      skillsRequired,
    });

    expect(classify).toHaveBeenCalledWith('Build login flow');
    expect(tasks[0].props.skillsRequired).toEqual([Skills.BACKEND, Skills.FRONTEND]);
  });

  it('falls back to no skills when the classifier fails', async () => {
    classify.mockRejectedValue(new Error('OpenAI unavailable'));

    const tasks = await service.createTaskAndSubtasks({ title: 'Build login flow' });

    expect(tasks[0].props.skillsRequired).toEqual([]);
  });

  it('should recursively create subtasks', async () => {
    const tasks = await service.createTaskAndSubtasks({
      title: 'Build main task',
      skillsRequired: [],
      subtasks: [
        {
          title: 'Build subtask 1',
          skillsRequired: [Skills.BACKEND],
        },
        {
          title: 'Build subtask 2',
          skillsRequired: [Skills.FRONTEND],
          subtasks: [{ title: 'Build subtask 2.1' }],
        },
      ],
    });

    expect(tasks).toHaveLength(4);
    const mainTaskId = tasks.find((task) => task.props.title === 'Build main task')?.props.id;
    const subtask2Id = tasks.find((task) => task.props.title === 'Build subtask 2')?.props.id;

    expect(createTask).toHaveBeenCalledTimes(4);
    expect(createTask).toHaveBeenCalledWith(
      expect.objectContaining({
        _props: expect.objectContaining({ title: 'Build main task', subtaskOf: null }),
      }),
    );
    expect(createTask).toHaveBeenCalledWith(
      expect.objectContaining({
        _props: expect.objectContaining({ title: 'Build subtask 1', subtaskOf: mainTaskId }),
      }),
    );
    expect(createTask).toHaveBeenCalledWith(
      expect.objectContaining({
        _props: expect.objectContaining({ title: 'Build subtask 2', subtaskOf: mainTaskId }),
      }),
    );
    expect(createTask).toHaveBeenCalledWith(
      expect.objectContaining({
        _props: expect.objectContaining({ title: 'Build subtask 2.1', subtaskOf: subtask2Id }),
      }),
    );
  });
});
