import { Controller, Get } from '@nestjs/common';
import { Skills } from './skills.constants.js';

@Controller('skills')
export class SkillsController {
  @Get()
  getAllSkills(): Skills[] {
    return Object.values(Skills);
  }
}