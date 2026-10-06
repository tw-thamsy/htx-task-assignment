import OpenAI from 'openai';

import { Skills } from '#shared/skills.constants';

import { SkillClassifier } from './skill-classifier.js';
import {
  SKILL_CLASSIFIER_RESPONSE_SCHEMA,
  SKILL_CLASSIFIER_SYSTEM_PROMPT,
} from './skill-classifier.prompt.js';

export const DEFAULT_SKILL_CLASSIFIER_MODEL = 'gpt-5.4-mini';

const VALID_SKILLS = new Set<string>(Object.values(Skills));

export class OpenAiSkillClassifier extends SkillClassifier {
  constructor(
    private readonly client: Pick<OpenAI, 'chat'>,
    private readonly model: string = DEFAULT_SKILL_CLASSIFIER_MODEL,
  ) {
    super();
  }

  async classify(taskTitle: string): Promise<Skills[]> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: SKILL_CLASSIFIER_SYSTEM_PROMPT },
        { role: 'user', content: taskTitle },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'task_skills',
          strict: true,
          schema: SKILL_CLASSIFIER_RESPONSE_SCHEMA,
        },
      },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Skill classifier returned an empty response');
    }
    return parseSkills(content);
  }
}

export function parseSkills(content: string): Skills[] {
  const parsed: unknown = JSON.parse(content);
  const skills = (parsed as { skills?: unknown } | null)?.skills;
  if (!Array.isArray(skills)) {
    throw new Error(`Skill classifier returned an invalid response: ${content}`);
  }
  const validSkills = skills.filter(
    (skill): skill is Skills => typeof skill === 'string' && VALID_SKILLS.has(skill),
  );
  return [...new Set(validSkills)];
}
