import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevelopersModule } from '../developers/developers.module.js';
import { SkillClassifierModule } from '../skill-classifier/skill-classifier.module.js';
import { TaskController } from './controller/task.controller.js';
import { TaskRepository } from './task.repository.js';
import { TaskService } from './task.service.js';
import { TaskTypeOrm } from './task.typeorm.js';

@Module({
  controllers: [TaskController],
  imports: [DevelopersModule, SkillClassifierModule, TypeOrmModule.forFeature([TaskTypeOrm])],
  providers: [TaskRepository, TaskService],
})
export class TasksModule {}
