import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { Task, TaskStatus } from './task.entity.js';
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

  async getAllTasks(): Promise<Task[]> {
    return this.repo.getAllTasks();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.repo.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.updateStatus(status);
    return this.repo.updateTask(task);
  }

  async assignTask(id: number, assignedTo: number): Promise<Task> {
    const task = await this.getTaskById(id);
    task.setAssignedTo(assignedTo);
    return this.repo.updateTask(task);
  }
}