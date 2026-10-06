import { Skills } from '#shared/skills.constants';

import { Developer } from './developer.entity.js';

describe('Developer Entity', () => {
  it('should create a developer with the correct properties', () => {
    const developer = Developer.create({
      id: null,
      name: 'Test Developer',
      skills: [Skills.BACKEND, Skills.FRONTEND],
    });

    expect(developer.props).toEqual({
      id: null,
      name: 'Test Developer',
      skills: [Skills.BACKEND, Skills.FRONTEND],
    });
  });

  it('should create a developer with no skills', () => {
    const developer = Developer.create({
      id: null,
      name: 'Test Developer',
      skills: [],
    });

    expect(developer.props.skills).toEqual([]);
  });

  it('should set the ID when it is not already set', () => {
    const developer = Developer.create({
      id: null,
      name: 'Test Developer',
      skills: [],
    });

    developer.setId(1);

    expect(developer.props.id).toBe(1);
  });

  it('should reject replacing an ID provided at creation', () => {
    const developer = Developer.create({
      id: 1,
      name: 'Test Developer',
      skills: [],
    });

    expect(() => developer.setId(2)).toThrow('ID is already set');
    expect(developer.props.id).toBe(1);
  });
});
