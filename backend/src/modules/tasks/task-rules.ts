import { BadRequestException } from '@nestjs/common';

import { Developer } from '../developers/developer.entity.js';
import { Task } from './task.entity.js';

function canAssignTaskToDeveloper(task: Task, developer: Developer) {
  return task.props.skillsRequired.every((skill) => developer.props.skills.includes(skill));
}

export function throwIfCannotAssignTaskToDeveloper(task: Task, developer: Developer) {
  if (!canAssignTaskToDeveloper(task, developer)) {
    throw new BadRequestException(
      `Developer ${developer.props.id} cannot be assigned to task ${task.props.id}`,
    );
  }
}
