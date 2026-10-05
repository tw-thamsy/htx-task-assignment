import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service.js';
import { CreateTaskDto } from './dtos/create-task.dto.js';
import { TaskDto, toTaskDto } from './dtos/task.dto.js';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto.js';
import { AssignTaskDto } from './dtos/assign-task.dto.js';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: CreateTaskDto): Promise<TaskDto> {
    const createdTask = await this.taskService.createTask(task);
    return toTaskDto(createdTask);
  }

  @Get()
  async getAllTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskService.getAllTasks();
    return tasks.map(toTaskDto);
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    const task = await this.taskService.getTaskById(id);
    return toTaskDto(task);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskStatusDto,
  ): Promise<TaskDto> {
    const task = await this.taskService.updateTaskStatus(id, body.status);
    return toTaskDto(task);
  }

  @Patch(':id/assign')
  async assignTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AssignTaskDto,
  ): Promise<TaskDto> {
    const task = await this.taskService.assignTask(id, body.assignedTo);
    return toTaskDto(task);
  }
}
