import type { Skills } from '../../skills.constants.js';

export interface CreateTaskDto {
  title: string;
  skillsRequired?: Skills[];
}
