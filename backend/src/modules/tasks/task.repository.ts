import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';
import { TaskTypeOrm } from './task.typeorm.js';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskTypeOrm)
    private readonly tasks: Repository<TaskTypeOrm>,
  ) {}

  createTask(task: Task): Promise<Task> {
    return this.tasks.save(task);
  }
}