import { randomInt } from 'node:crypto';
import { Task, TaskStatus } from './task.entity.js';
import { TaskRepository } from './task.repository.js';
import { TaskTypeOrm } from './task.typeorm.js';
import { queryRunner } from './task.repository.setup.js';

describe('TaskRepository integration', () => {
  let repository: TaskRepository;

  beforeEach(() => {
    repository = new TaskRepository(
      queryRunner.manager.getRepository(TaskTypeOrm),
    );
  });

  it('persists a task and returns the saved task', async () => {
    const task: Task = {
      id: -randomInt(1, 2 ** 47),
      title: 'Create a task',
      status: TaskStatus.TODO,
      assignedTo: null,
    };

    await expect(repository.createTask(task)).resolves.toEqual(task);

    const persistedTask = await queryRunner.manager
      .getRepository(TaskTypeOrm)
      .findOneByOrFail({ id: task.id });

    expect(persistedTask).toEqual({ ...task, id: String(task.id) });
  });

  it('propagates database errors', async () => {
    const task: Task = {
      id: -randomInt(1, 2 ** 47),
      title: 'a'.repeat(256),
      status: TaskStatus.TODO,
      assignedTo: null,
    };

    await expect(repository.createTask(task)).rejects.toMatchObject({
      driverError: { code: '22001' },
    });
  });
});