import 'reflect-metadata';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';
import { DataSource, QueryRunner } from 'typeorm';
import { TaskTypeOrm } from '../../src/modules/tasks/task.typeorm.js';

let dataSource: DataSource;
export let queryRunner: QueryRunner;

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