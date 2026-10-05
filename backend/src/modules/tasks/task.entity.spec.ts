import { Task, TaskStatus } from './task.entity.js';

describe('Task Entity', () => {
  it('should create a task with the correct properties', () => {
    const task = Task.create({
      id: null,
      title: 'Test Task',
      status: TaskStatus.IN_PROGRESS,
      assignedTo: null,
    });
    expect(task.props.title).toBe('Test Task');
    expect(task.props.status).toBe(TaskStatus.IN_PROGRESS);
    expect(task.props.assignedTo).toBeNull();
    expect(task.props.id).toBeNull();
  });

  it('should throw an error if trying to set the ID after creation', () => {
    const task = Task.create({
      id: 1,
      title: 'Test Task',
      status: TaskStatus.IN_PROGRESS,
      assignedTo: null,
    });
    expect(() => task.setId(2)).toThrow('ID is already set');
  });
});