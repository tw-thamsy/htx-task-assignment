import { Skills } from '../../skills/skills.constants.js';
import { Developer } from '../developer.entity.js';

export class DeveloperDto {
  id!: number;
  name!: string;
  skills!: Skills[];
}

export function toDeveloperDto(developer: Developer): DeveloperDto {
  const props = developer.props;
  return { ...props, id: props.id ?? 0 };
}