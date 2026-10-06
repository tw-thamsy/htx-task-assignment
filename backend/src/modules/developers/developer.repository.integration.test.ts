import { Skills } from '#shared/skills.constants';

import { queryRunner } from '../../../test/integration/setup.js';
import { Developer } from './developer.entity.js';
import { DeveloperRepository } from './developer.repository.js';
import { DeveloperTypeOrm } from './developer.typeorm.js';

describe('DeveloperRepository integration', () => {
  let repository: DeveloperRepository;

  beforeEach(async () => {
    await queryRunner.query(
      'CREATE TEMP TABLE developers (LIKE public.developers INCLUDING ALL) ON COMMIT DROP',
    );
    repository = new DeveloperRepository(queryRunner.manager.getRepository(DeveloperTypeOrm));
  });

  it('should create a developer with a numeric id and persist skills', async () => {
    const developer = Developer.create({
      id: null,
      name: 'Created developer',
      skills: [Skills.BACKEND, Skills.FRONTEND],
    });

    const createdDeveloper = await repository.createDeveloper(developer);

    expect(createdDeveloper.props.id).toEqual(expect.any(Number));
    expect(createdDeveloper.props.id).toBeGreaterThan(0);
    expect(createdDeveloper.props.name).toBe(developer.props.name);
    expect(createdDeveloper.props.skills).toStrictEqual(developer.props.skills);
    const persistedDeveloper = await repository.getDeveloperById(createdDeveloper.props.id!);
    expect(persistedDeveloper?.props).toStrictEqual(createdDeveloper.props);
  });

  it('should list all developers', async () => {
    const firstDeveloper = await repository.createDeveloper(
      Developer.create({
        id: null,
        name: 'First listed developer',
        skills: [Skills.BACKEND],
      }),
    );
    const secondDeveloper = await repository.createDeveloper(
      Developer.create({
        id: null,
        name: 'Second listed developer',
        skills: [Skills.FRONTEND],
      }),
    );

    const developers = await repository.getAllDevelopers();

    expect(developers.map((developer) => developer.props)).toEqual(
      expect.arrayContaining([firstDeveloper.props, secondDeveloper.props]),
    );
  });

  it('should get a developer by id with empty skills', async () => {
    const createdDeveloper = await repository.createDeveloper(
      Developer.create({
        id: null,
        name: 'Developer found by id',
        skills: [],
      }),
    );

    const developer = await repository.getDeveloperById(createdDeveloper.props.id!);

    expect(developer?.props).toStrictEqual(createdDeveloper.props);
  });

  it('should return null when a developer id does not exist', async () => {
    const developer = await repository.getDeveloperById(0);

    expect(developer).toBeNull();
  });
});
