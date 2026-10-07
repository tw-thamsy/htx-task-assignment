import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

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

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskValidationDto)
  subtasks?: CreateTaskValidationDto[] | undefined;
}
