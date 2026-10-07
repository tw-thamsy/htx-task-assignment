import type { CreateTaskDto } from '#shared/dtos/tasks/create-task.dto';

export function validateTitle(value: string): string {
  const trimmedTitle = value.trim();
  if (trimmedTitle.length === 0) {
    return 'Title is required';
  }
  if (trimmedTitle.length > 255) {
    return 'Title must be 255 characters or fewer';
  }
  return '';
}

export function isCreateTaskDtoValid(dto: CreateTaskDto): boolean {
  if (validateTitle(dto.title) !== '') {
    return false;
  }
  if (dto.subtasks) {
    for (const subtask of dto.subtasks) {
      if (!isCreateTaskDtoValid(subtask)) {
        return false;
      }
    }
  }
  return true;
}
