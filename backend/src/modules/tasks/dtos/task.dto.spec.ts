import { Skills } from '#shared/skills.constants';

import { Task } from '../task.entity.js';
import { TaskStatus } from '../task.entity.js';
import { toTaskDto } from './task.dto.js';

describe('TaskDto Mapper', () => {
  it('should map a Task entity to a TaskDto correctly', () => {
    // Arrange
    const task = Task.create({
      id: 1,
      title: 'Test Task',
      status: TaskStatus.DONE,
      skillsRequired: [Skills.BACKEND],
      assignedTo: null,
    });

    const taskDto = toTaskDto(task);

    expect(taskDto).toHaveProperty('id', task.props.id);
    expect(taskDto).toHaveProperty('title', task.props.title);
    expect(taskDto).toHaveProperty('status', task.props.status);
    expect(taskDto).toHaveProperty('assignedTo', task.props.assignedTo);
    expect(taskDto).toHaveProperty('skillsRequired', task.props.skillsRequired);
  });
});
