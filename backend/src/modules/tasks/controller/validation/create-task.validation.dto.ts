import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

import type { CreateTaskDto } from '#shared/dtos/tasks/create-task.dto';
import { Skills } from '#shared/skills.constants';

export class CreateTaskValidationDto implements CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsEnum(Skills, { each: true })
  skillsRequired?: Skills[];
}
