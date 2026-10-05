import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { Task } from './task.entity.js';

@Injectable()
export class TaskService {

  constructor(
    @Inject()
    private readonly repo: TaskRepository,
  ) {}

  async createTask(task: Task): Promise<Task> {
    return this.repo.createTask(task);
  }
}