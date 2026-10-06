import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import type { DeveloperDto } from '#shared/dtos/developers/developer.dto';

import { DeveloperService } from '../developer.service.js';
import { toDeveloperDto } from './mapper/developer.mapper.js';

@Controller('developers')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Get()
  async getAllDevelopers(): Promise<DeveloperDto[]> {
    const developers = await this.developerService.getAllDevelopers();
    return developers.map(toDeveloperDto);
  }

  @Get(':id')
  async getDeveloperById(@Param('id', ParseIntPipe) id: number): Promise<DeveloperDto> {
    return toDeveloperDto(await this.developerService.getDeveloperById(id));
  }
}
