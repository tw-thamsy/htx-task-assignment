import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DeveloperService } from './developer.service.js';
import { DeveloperDto, toDeveloperDto } from './dtos/developer.dto.js';

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