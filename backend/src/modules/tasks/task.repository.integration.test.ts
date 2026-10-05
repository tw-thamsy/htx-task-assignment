import { randomInt } from 'node:crypto';
import { Task, TaskStatus } from './task.entity.js';
import { TaskRepository } from './task.repository.js';
import { TaskTypeOrm } from './task.typeorm.js';
import { queryRunner } from '../../../test/integration/setup.js';

describe('TaskRepository integration', () => {
  let repository: TaskRepository;

  beforeEach(() => {
    repository = new TaskRepository(
      queryRunner.manager.getRepository(TaskTypeOrm),
    );
  });

  it('should create task with id', async () => {
    const task = Task.create({
      id: null,
      title: 'Create a task',
      status: TaskStatus.TODO,
      assignedTo: null,
    });

    const createdTask = await repository.createTask(task);

    expect(createdTask.props.id).not.toBeNull();
    expect(createdTask.props.title).toBe(task.props.title);
    expect(createdTask.props.status).toBe(task.props.status);
    expect(createdTask.props.assignedTo).toBe(task.props.assignedTo);
  });
});