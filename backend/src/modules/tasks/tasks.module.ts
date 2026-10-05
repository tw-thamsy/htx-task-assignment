import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeOrm } from './task.typeorm.js';
import { TaskRepository } from './task.repository.js';
import { TaskService } from './task.service.js';
import { TaskController } from './task.controller.js';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([TaskTypeOrm])],
  providers: [TaskRepository, TaskService],
})
export class TasksModule {}