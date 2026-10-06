import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

import { Skills } from '#shared/skills.constants';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsEnum(Skills, { each: true })
  skillsRequired?: Skills[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value === undefined ? null : Number(value)))
  assignedTo: number | null;
}
