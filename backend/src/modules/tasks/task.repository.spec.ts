import 'reflect-metadata';
import { randomInt } from 'node:crypto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, QueryRunner } from 'typeorm';
import { Task, TaskStatus } from './task.entity.js';
import { TaskRepository } from './task.repository.js';
import { TaskTypeOrm } from './task.typeorm.js';

describe('TaskRepository integration', () => {
  let dataSource: DataSource;
  let queryRunner: QueryRunner;
  let repository: TaskRepository;

  beforeAll(async () => {
    await ConfigModule.forRoot({ envFilePath: '.env' });
    const config = new ConfigService();
    dataSource = new DataSource({
      type: 'postgres',
      host: config.getOrThrow<string>('DB_HOST'),
      port: Number(config.getOrThrow<string>('DB_PORT')),
      username: config.getOrThrow<string>('DB_USER'),
      password: config.getOrThrow<string>('DB_PASSWORD'),
      database: config.getOrThrow<string>('DB_NAME'),
      entities: [TaskTypeOrm],
      synchronize: false,
      connectTimeoutMS: 5000,
    });
    await dataSource.initialize();
  }, 10000);

  beforeEach(async () => {
    queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    repository = new TaskRepository(
      queryRunner.manager.getRepository(TaskTypeOrm),
    );
  });

  afterEach(async () => {
    if (queryRunner && !queryRunner.isReleased) {
      try {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
      } finally {
        await queryRunner.release();
      }
    }
  });

  afterAll(async () => {
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
    }
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