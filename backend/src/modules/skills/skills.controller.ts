import { Controller, Get } from '@nestjs/common';

import { Skills } from '#shared/skills.constants';

@Controller('skills')
export class SkillsController {
  @Get()
  getAllSkills(): Skills[] {
    return Object.values(Skills);
  }
}
