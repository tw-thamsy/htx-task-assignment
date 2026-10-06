import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Developer } from './developer.entity.js';
import { DeveloperTypeOrm } from './developer.typeorm.js';

@Injectable()
export class DeveloperRepository {
  constructor(
    @InjectRepository(DeveloperTypeOrm)
    private readonly developers: Repository<DeveloperTypeOrm>,
  ) {}

  async createDeveloper(developer: Developer): Promise<Developer> {
    const result = await this.developers.insert(toDeveloperOrm(developer));
    developer.setId(Number(result.identifiers[0].id));
    return developer;
  }

  async getAllDevelopers(): Promise<Developer[]> {
    const developers = await this.developers.find();
    return developers.map(toDeveloper);
  }

  async getDeveloperById(id: number): Promise<Developer | null> {
    const developer = await this.developers.findOneBy({ id });
    return developer ? toDeveloper(developer) : null;
  }
}

export function toDeveloperOrm(developer: Developer): DeepPartial<DeveloperTypeOrm> {
  const props = developer.props;
  return { ...props, id: props.id ?? undefined };
}

export function toDeveloper(developer: DeveloperTypeOrm): Developer {
  return Developer.create({
    id: Number(developer.id),
    name: developer.name,
    skills: developer.skills,
  });
}
