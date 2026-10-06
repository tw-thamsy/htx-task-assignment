import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import type { TaskDto } from '#shared/dtos/tasks/task.dto';

import { DeveloperService } from '../../developers/developer.service.js';
import { Task } from '../task.entity.js';
import { TaskService } from '../task.service.js';
import { toTaskDto } from './mapper/task.mapper.js';
import { AssignTaskValidationDto } from './validation/assign-task.validation.dto.js';
import { CreateTaskValidationDto } from './validation/create-task.validation.dto.js';
import { UpdateTaskStatusValidationDto } from './validation/update-task-status.validation.dto.js';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly developerService: DeveloperService,
  ) {}

  @Post()
  async createTask(@Body() task: CreateTaskValidationDto): Promise<TaskDto> {
    const createdTask = await this.taskService.createTask(task);
    return this.mapTask(createdTask);
  }

  @Get()
  async getAllTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskService.getAllTasks();
    return Promise.all(tasks.map((task) => this.mapTask(task)));
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    const task = await this.taskService.getTaskById(id);
    return this.mapTask(task);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskStatusValidationDto,
  ): Promise<TaskDto> {
    const task = await this.taskService.updateTaskStatus(id, body.status);
    return this.mapTask(task);
  }

  @Patch(':id/assign')
  async assignTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AssignTaskValidationDto,
  ): Promise<TaskDto> {
    const task = await this.taskService.assignTask(id, body.assignedTo);
    return this.mapTask(task);
  }

  private async mapTask(task: Task): Promise<TaskDto> {
    const assignedToId = task.props.assignedTo;
    const assignedTo =
      assignedToId === null ? null : await this.developerService.getDeveloperById(assignedToId);

    return toTaskDto(task, assignedTo);
  }
}
