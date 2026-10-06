import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { Task } from './task.entity.js';
import { TaskTypeOrm } from './task.typeorm.js';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskTypeOrm)
    private readonly tasks: Repository<TaskTypeOrm>,
  ) {}

  async createTask(task: Task): Promise<Task> {
    const res = await this.tasks.insert(toTaskOrm(task));
    task.setId(res.identifiers[0].id);
    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasks.find({ order: { id: 'ASC' } });
    return tasks.map(toTask);
  }

  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.tasks.findOneBy({ id });
    return task ? toTask(task) : null;
  }

  async updateTask(task: Task): Promise<Task> {
    await this.tasks.update({ id: task.props.id! }, toTaskOrm(task));
    return task;
  }
}

export function toTaskOrm(task: Task): DeepPartial<TaskTypeOrm> {
  return {
    ...task.props,
    id: task.props.id ?? undefined,
  };
}
export function toTask(ormTask: TaskTypeOrm): Task {
  return Task.create({
    id: ormTask.id,
    title: ormTask.title,
    status: ormTask.status,
    skillsRequired: ormTask.skillsRequired,
    assignedTo: ormTask.assignedTo,
  });
}
