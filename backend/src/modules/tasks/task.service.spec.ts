import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

import { DeveloperService } from '../developers/developer.service.js';
import { SkillClassifier } from '../skill-classifier/skill-classifier.js';
import { Task } from './task.entity.js';
import { TaskRepository } from './task.repository.js';
import { TaskService } from './task.service.js';

describe('TaskService.createTask', () => {
  let classify: ReturnType<typeof vi.fn<SkillClassifier['classify']>>;
  let service: TaskService;

  beforeEach(() => {
    classify = vi.fn<SkillClassifier['classify']>();
    const repo = {
      createTask: vi.fn<(task: Task) => Promise<Task>>(async (task) => task),
    } as unknown as TaskRepository;
    service = new TaskService(repo, {} as DeveloperService, { classify } as SkillClassifier);
  });

  it('uses the provided skills without calling the classifier', async () => {
    const task = await service.createTask({
      title: 'Build login page',
      skillsRequired: [Skills.FRONTEND],
    });

    expect(classify).not.toHaveBeenCalled();
    expect(task.props).toEqual({
      id: null,
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

    const task = await service.createTask({ title: 'Build login flow', skillsRequired });

    expect(classify).toHaveBeenCalledWith('Build login flow');
    expect(task.props.skillsRequired).toEqual([Skills.BACKEND, Skills.FRONTEND]);
  });

  it('falls back to no skills when the classifier fails', async () => {
    classify.mockRejectedValue(new Error('OpenAI unavailable'));

    const task = await service.createTask({ title: 'Build login flow' });

    expect(task.props.skillsRequired).toEqual([]);
  });
});
