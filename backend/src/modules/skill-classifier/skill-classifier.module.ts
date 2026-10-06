import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

import { Skills } from '#shared/skills.constants';

import {
  DEFAULT_SKILL_CLASSIFIER_MODEL,
  OpenAiSkillClassifier,
} from './openai-skill-classifier.js';
import { SkillClassifier } from './skill-classifier.js';

class NoopSkillClassifier extends SkillClassifier {
  async classify(): Promise<Skills[]> {
    const skills: Skills[] = [];
    if (Math.random() > 0.5) {
      skills.push(Skills.BACKEND);
    }
    if (Math.random() > 0.5) {
      skills.push(Skills.FRONTEND);
    }
    return skills;
  }
}

@Module({
  providers: [
    {
      provide: SkillClassifier,
      inject: [ConfigService],
      useFactory: (config: ConfigService): SkillClassifier => {
        const apiKey = config.get<string>('OPENAI_API_KEY');
        if (!apiKey) {
          new Logger(SkillClassifierModule.name).warn(
            'OPENAI_API_KEY is not set; skill classification is disabled',
          );
          return new NoopSkillClassifier();
        }
        return new OpenAiSkillClassifier(
          new OpenAI({ apiKey }),
          config.get<string>('OPENAI_SKILL_CLASSIFIER_MODEL') || DEFAULT_SKILL_CLASSIFIER_MODEL,
        );
      },
    },
  ],
  exports: [SkillClassifier],
})
export class SkillClassifierModule {}
