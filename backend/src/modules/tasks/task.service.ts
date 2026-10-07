import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

import type { CreateTaskDto } from '#shared/dtos/tasks/create-task.dto';
import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

import { DeveloperService } from '../developers/developer.service.js';
import { SkillClassifier } from '../skill-classifier/skill-classifier.js';
import { throwIfCannotAssignTaskToDeveloper } from './task-rules.js';
import { Task } from './task.entity.js';
import { TaskRepository } from './task.repository.js';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @Inject()
    private readonly repo: TaskRepository,
    private readonly devSvc: DeveloperService,
    private readonly skillClassifier: SkillClassifier,
  ) {}

  async createTask(task: CreateTaskDto): Promise<Task> {
    const newTask = Task.create({
      id: null,
      title: task.title,
      status: TaskStatus.TODO,
      skillsRequired: task.skillsRequired?.length
        ? task.skillsRequired
        : await this.classifySkills(task.title),
      assignedTo: null,
      subtaskOf: null,
    });
    return this.repo.createTask(newTask);
  }

  private async classifySkills(title: string): Promise<Skills[]> {
    try {
      return await this.skillClassifier.classify(title);
    } catch (error) {
      this.logger.warn(`Failed to classify skills for task "${title}": ${String(error)}`);
      return [];
    }
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

    const developer = await this.devSvc.getDeveloperById(assignedTo);
    throwIfCannotAssignTaskToDeveloper(task, developer);

    task.setAssignedTo(developer.props.id);
    return this.repo.updateTask(task);
  }
}
