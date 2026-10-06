import type { Skills } from '../../skills.constants.js';
import type { TaskStatus } from '../../task-status.constants.js';
import type { DeveloperDto } from '../developers/developer.dto.js';

export interface TaskDto {
  id: number;
  title: string;
  status: TaskStatus;
  skillsRequired: Skills[];
  assignedTo: DeveloperDto | null;
}
