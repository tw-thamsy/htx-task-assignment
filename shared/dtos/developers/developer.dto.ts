import type { Skills } from '../../skills.constants.js';

export interface DeveloperDto {
  id: number;
  name: string;
  skills: Skills[];
}
