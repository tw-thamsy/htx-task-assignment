import { Task, TaskStatus } from "./task.entity.js";
import { toTaskOrm, toTask } from "./task.repository.js";
import { TaskTypeOrm } from "./task.typeorm.js";

describe('Task Repository Mappers', () => {
  it('should map a Task entity to a TaskTypeOrm correctly', () => {
    const ormTask = toTaskOrm(Task.create({
      id: null,
      title: 'Test Task',
      status: TaskStatus.IN_PROGRESS,
      assignedTo: null,
    }));
    expect(ormTask.id).toBeUndefined();
    expect(ormTask.title).toBe('Test Task');
    expect(ormTask.status).toBe(TaskStatus.IN_PROGRESS);
    expect(ormTask.assignedTo).toBeNull();
  });

  it('should map a TaskTypeOrm to a Task entity correctly', () => {
    const ormTask: TaskTypeOrm = {
      id: 1,
      title: 'Test Task',
      status: TaskStatus.IN_PROGRESS,
      assignedTo: null,
    };
    const task = toTask(ormTask);

    expect(task.props.id).toBe(ormTask.id);
    expect(task.props.title).toBe(ormTask.title);
    expect(task.props.status).toBe(ormTask.status);
    expect(task.props.assignedTo).toBe(ormTask.assignedTo);
  });
});