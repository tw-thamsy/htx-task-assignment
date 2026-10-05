import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { Task } from './task.entity.js';
import { CreateTaskDto } from './dtos/create-task.dto.js';

@Injectable()
export class TaskService {

  constructor(
    @Inject()
    private readonly repo: TaskRepository,
  ) {}

  async createTask(task: CreateTaskDto): Promise<Task> {
    // TODO: check if user has skills to be assigned to the task
    const newTask = Task.create({
        id: null,
        title: task.title,
        status: task.status,
        assignedTo: task.assignedTo,
      });
    return this.repo.createTask(newTask);
  }
}