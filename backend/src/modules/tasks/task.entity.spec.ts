import { Task, TaskStatus } from './task.entity.js';
import { Skills } from '../skills/skills.constants.js';

describe('Task Entity', () => {
  it('should create a task with the correct properties', () => {
    const task = Task.create({
      id: null,
      title: 'Test Task',
      status: TaskStatus.IN_PROGRESS,
      skillsRequired: [Skills.BACKEND],
      assignedTo: null,
    });
    expect(task.props.title).toBe('Test Task');
    expect(task.props.status).toBe(TaskStatus.IN_PROGRESS);
    expect(task.props.assignedTo).toBeNull();
    expect(task.props.skillsRequired).toEqual([Skills.BACKEND]);
    expect(task.props.id).toBeNull();
  });

  it('should throw an error if trying to set the ID after creation', () => {
    const task = Task.create({
      id: 1,
      title: 'Test Task',
      status: TaskStatus.IN_PROGRESS,
      skillsRequired: [Skills.FRONTEND],
      assignedTo: null,
    });
    expect(() => task.setId(2)).toThrow('ID is already set');
  });

  it('should update the status of a task', () => {
    const task = Task.create({
      id: null,
      title: 'Initial Title',
      status: TaskStatus.TODO,
      skillsRequired: [],
      assignedTo: null,
    });
    task.updateStatus(TaskStatus.IN_PROGRESS);
    expect(task.props.status).toBe(TaskStatus.IN_PROGRESS);
  });
  
  it('should set the assignedTo property of a task', () => {
    const task = Task.create({
      id: null,
      title: 'Initial Title',
      status: TaskStatus.TODO,
      skillsRequired: [Skills.BACKEND],
      assignedTo: null,
    });
    task.setAssignedTo(5);
    expect(task.props.assignedTo).toBe(5);
  });
});