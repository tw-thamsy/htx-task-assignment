import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Developer } from './developer.entity.js';
import { DeveloperRepository } from './developer.repository.js';

@Injectable()
export class DeveloperService {
  constructor(
    @Inject()
    private readonly repo: DeveloperRepository,
  ) {}

  async getAllDevelopers(): Promise<Developer[]> {
    return this.repo.getAllDevelopers();
  }

  async getDeveloperById(id: number): Promise<Developer> {
    const developer = await this.repo.getDeveloperById(id);
    if (!developer) {
      throw new NotFoundException(`Developer ${id} not found`);
    }
    return developer;
  }
}
