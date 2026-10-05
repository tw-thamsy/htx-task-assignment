import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeOrm } from './task.typeorm.js';
import { TaskRepository } from './task.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([TaskTypeOrm])],
  providers: [TaskRepository],
})
export class TasksModule {}