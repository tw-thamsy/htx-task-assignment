import { Controller, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service.js';
import { Task } from './task.entity.js';
import { CreateTaskDto } from './dtos/create-task.dto.js';
import { TaskDto, toTaskDto } from './dtos/task.dto.js';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: CreateTaskDto): Promise<TaskDto> {
    const createdTask = await this.taskService.createTask(
      Task.create({
        id: null,
        title: task.title,
        status: task.status,
        assignedTo: task.assignedTo,
      }),
    );
    return toTaskDto(createdTask);
  }
}
