import { Skills } from '#shared/skills.constants';

// Abstract class doubles as the Nest DI token so implementations can be swapped (e.g. in tests).
export abstract class SkillClassifier {
  abstract classify(taskTitle: string): Promise<Skills[]>;
}
