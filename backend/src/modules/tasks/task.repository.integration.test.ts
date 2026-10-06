import { Skills } from '#shared/skills.constants';

import { queryRunner } from '../../../test/integration/setup.js';
import { Task, TaskStatus } from './task.entity.js';
import { TaskRepository } from './task.repository.js';
import { TaskTypeOrm } from './task.typeorm.js';

describe('TaskRepository integration', () => {
  let repository: TaskRepository;

  beforeEach(() => {
    repository = new TaskRepository(queryRunner.manager.getRepository(TaskTypeOrm));
  });

  it('should create task with id', async () => {
    const task = Task.create({
      id: null,
      title: 'Create a task',
      status: TaskStatus.TODO,
      skillsRequired: [],
      assignedTo: null,
    });

    const createdTask = await repository.createTask(task);

    expect(createdTask.props.id).not.toBeNull();
    expect(createdTask.props.title).toBe(task.props.title);
    expect(createdTask.props.status).toBe(task.props.status);
    expect(createdTask.props.assignedTo).toBe(task.props.assignedTo);
  });

  it('should list all tasks', async () => {
    const firstTask = await repository.createTask(
      Task.create({
        id: null,
        title: 'First listed task',
        status: TaskStatus.TODO,
        skillsRequired: [Skills.BACKEND, Skills.FRONTEND],
        assignedTo: null,
      }),
    );
    const secondTask = await repository.createTask(
      Task.create({
        id: null,
        title: 'Second listed task',
        status: TaskStatus.IN_PROGRESS,
        skillsRequired: [],
        assignedTo: null,
      }),
    );

    const tasks = await repository.getAllTasks();

    expect(tasks.map((task) => task.props.id)).toEqual(
      expect.arrayContaining([firstTask.props.id, secondTask.props.id]),
    );
    expect(tasks.find((task) => task.props.id === firstTask.props.id)?.props).toStrictEqual(
      firstTask.props,
    );
  });

  it('should get a task by id', async () => {
    const createdTask = await repository.createTask(
      Task.create({
        id: null,
        title: 'Task found by id',
        status: TaskStatus.IN_PROGRESS,
        skillsRequired: [],
        assignedTo: null,
      }),
    );

    const task = await repository.getTaskById(createdTask.props.id!);

    expect(task?.props).toStrictEqual(createdTask.props);
  });

  it('should return null when a task id does not exist', async () => {
    const task = await repository.getTaskById(0);

    expect(task).toBeNull();
  });

  it('should update a task', async () => {
    const createdTask = await repository.createTask(
      Task.create({
        id: null,
        title: 'Task to be updated',
        status: TaskStatus.TODO,
        skillsRequired: [],
        assignedTo: null,
      }),
    );

    // createdTask.setAssignedTo(10); // TODO: implement when developers implemented
    createdTask.updateStatus(TaskStatus.IN_PROGRESS);

    const updatedTask = await repository.updateTask(createdTask);

    // expect(updatedTask.props.assignedTo).toBe(10);
    expect(updatedTask.props.status).toBe(TaskStatus.IN_PROGRESS);
  });
});
