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
}

export function toTaskOrm(task: Task): DeepPartial<TaskTypeOrm> {
  return {
    id: task.props.id ?? undefined,
    title: task.props.title,
    status: task.props.status,
    assignedTo: task.props.assignedTo,
  };
}
export function toTask(ormTask: TaskTypeOrm): Task {
  return Task.create({
    id: ormTask.id,
    title: ormTask.title,
    status: ormTask.status,
    assignedTo: ormTask.assignedTo,
  });
}