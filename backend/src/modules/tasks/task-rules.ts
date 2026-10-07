import { BadRequestException } from '@nestjs/common';

import { TaskStatus } from '#shared/task-status.constants';

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

function isAllSubtasksCompleted(subtasks: Task[]) {
  return subtasks.every((subtask) => subtask.props.status === TaskStatus.DONE);
}

export function throwIfNotAllSubtasksCompletedAndParentTaskStatusTransitionToDone(
  toParentTaskStatus: TaskStatus,
  subtasks: Task[],
) {
  if (toParentTaskStatus === TaskStatus.DONE && !isAllSubtasksCompleted(subtasks)) {
    throw new BadRequestException(`Not all subtasks are completed`);
  }
}
