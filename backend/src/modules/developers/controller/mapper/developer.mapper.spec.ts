import { Skills } from '#shared/skills.constants';

import { Developer } from '../../developer.entity.js';
import { toDeveloperDto } from './developer.mapper.js';

describe('Developer Mapper', () => {
  it('maps a persisted developer to a DTO', () => {
    const developer = Developer.create({
      id: 7,
      name: 'Test Developer',
      skills: [Skills.BACKEND, Skills.FRONTEND],
    });

    expect(toDeveloperDto(developer)).toEqual({
      id: 7,
      name: 'Test Developer',
      skills: [Skills.BACKEND, Skills.FRONTEND],
    });
  });

  it('maps a null developer ID to zero', () => {
    const developer = Developer.create({
      id: null,
      name: 'New Developer',
      skills: [],
    });

    expect(toDeveloperDto(developer)).toEqual({
      id: 0,
      name: 'New Developer',
      skills: [],
    });
  });
});
