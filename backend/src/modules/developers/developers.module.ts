import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeveloperController } from './controller/developer.controller.js';
import { DeveloperRepository } from './developer.repository.js';
import { DeveloperService } from './developer.service.js';
import { DeveloperTypeOrm } from './developer.typeorm.js';

@Module({
  imports: [TypeOrmModule.forFeature([DeveloperTypeOrm])],
  controllers: [DeveloperController],
  providers: [DeveloperRepository, DeveloperService],
})
export class DevelopersModule {}
