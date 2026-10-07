import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

import { queryRunner } from '../../../test/integration/setup.js';
import { Task } from './task.entity.js';
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
      subtaskOf: null,
    });

    const createdTask = await repository.createTask(task);

    expect(createdTask.props.id).not.toBeNull();
    expect(createdTask.props.title).toBe(task.props.title);
    expect(createdTask.props.status).toBe(task.props.status);
    expect(createdTask.props.skillsRequired).toStrictEqual(task.props.skillsRequired);
    expect(createdTask.props.assignedTo).toBe(task.props.assignedTo);
    expect(createdTask.props.subtaskOf).toBe(task.props.subtaskOf);
  });

  it('should list all tasks in asc order', async () => {
    const firstTask = await repository.createTask(
      Task.create({
        id: null,
        title: 'First listed task',
        status: TaskStatus.TODO,
        skillsRequired: [Skills.BACKEND, Skills.FRONTEND],
        assignedTo: null,
        subtaskOf: null,
      }),
    );
    const secondTask = await repository.createTask(
      Task.create({
        id: null,
        title: 'Second listed task',
        status: TaskStatus.IN_PROGRESS,
        skillsRequired: [],
        assignedTo: null,
        subtaskOf: null,
      }),
    );

    const tasks = await repository.getAllTasks();

    expect(tasks.map((task) => task.props.id)).toEqual(
      expect.arrayContaining([firstTask.props.id, secondTask.props.id]),
    );
    expect(tasks.find((task) => task.props.id === firstTask.props.id)?.props).toStrictEqual(
      firstTask.props,
    );
    expect(tasks.findIndex((task) => task.props.id === firstTask.props.id)).toBeLessThan(
      tasks.findIndex((task) => task.props.id === secondTask.props.id),
    );
  });

  it('should get all subtasks of a task', async () => {
    const parentTask = await repository.createTask(
      Task.create({
        id: null,
        title: 'Parent task',
        status: TaskStatus.TODO,
        skillsRequired: [],
        assignedTo: null,
        subtaskOf: null,
      }),
    );

    const subtask1 = await repository.createTask(
      Task.create({
        id: null,
        title: 'Subtask 1',
        status: TaskStatus.TODO,
        skillsRequired: [],
        assignedTo: null,
        subtaskOf: parentTask.props.id!,
      }),
    );

    const subtask2 = await repository.createTask(
      Task.create({
        id: null,
        title: 'Subtask 2',
        status: TaskStatus.TODO,
        skillsRequired: [],
        assignedTo: null,
        subtaskOf: parentTask.props.id!,
      }),
    );

    // Create a sub-subtask to ensure it is not included in the depth 1 subtasks list
    await repository.createTask(
      Task.create({
        id: null,
        title: 'Sub-subtask',
        status: TaskStatus.TODO,
        skillsRequired: [],
        assignedTo: null,
        subtaskOf: subtask1.props.id!,
      }),
    );

    const subtasks = await repository.getAllSubtasksDepth1(parentTask.props.id!);

    expect(subtasks).toHaveLength(2);
    expect(subtasks.map((task) => task.props.id)).toEqual(
      expect.arrayContaining([subtask1.props.id, subtask2.props.id]),
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
        subtaskOf: null,
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
        subtaskOf: null,
      }),
    );

    // createdTask.setAssignedTo(10); // TODO: implement when developers implemented
    createdTask.updateStatus(TaskStatus.IN_PROGRESS);

    const updatedTask = await repository.updateTask(createdTask);

    // expect(updatedTask.props.assignedTo).toBe(10);
    expect(updatedTask.props.status).toBe(TaskStatus.IN_PROGRESS);
  });
});
