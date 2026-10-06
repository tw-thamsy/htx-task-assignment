import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from './controller/task.controller.js';
import { TaskRepository } from './task.repository.js';
import { TaskService } from './task.service.js';
import { TaskTypeOrm } from './task.typeorm.js';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([TaskTypeOrm])],
  providers: [TaskRepository, TaskService],
})
export class TasksModule {}
