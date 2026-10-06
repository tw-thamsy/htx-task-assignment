import type { DeveloperDto } from '#shared/dtos/developers/developer.dto';

import { Developer } from '../../developer.entity.js';

export function toDeveloperDto(developer: Developer): DeveloperDto {
  const props = developer.props;
  return { ...props, id: props.id ?? 0 };
}
