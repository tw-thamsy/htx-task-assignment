import OpenAI from 'openai';

import { Skills } from '#shared/skills.constants';

import {
  DEFAULT_SKILL_CLASSIFIER_MODEL,
  OpenAiSkillClassifier,
} from '../openai-skill-classifier.js';
import { SKILL_CLASSIFIER_EVAL_CASES } from './skill-classifier.dataset.js';

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_SKILL_CLASSIFIER_MODEL || DEFAULT_SKILL_CLASSIFIER_MODEL;
const minAccuracy = Number(process.env.SKILL_CLASSIFIER_EVAL_MIN_ACCURACY ?? 0.85);
const minRecall = Number(process.env.SKILL_CLASSIFIER_EVAL_MIN_RECALL ?? 0.85);
const minPrecision = Number(process.env.SKILL_CLASSIFIER_EVAL_MIN_PRECISION ?? 0.85);

type EvalResult = { title: string; expected: Skills[]; actual: Skills[] | null; error?: string };

function sameSkills(a: Skills[], b: Skills[]) {
  return a.length === b.length && a.every((skill) => b.includes(skill));
}

function skillMetrics(results: EvalResult[], skill: Skills) {
  let tp = 0;
  let fp = 0;
  let fn = 0;
  for (const { expected, actual } of results) {
    const predicted = actual?.includes(skill) ?? false;
    const relevant = expected.includes(skill);
    if (predicted && relevant) tp++;
    else if (predicted) fp++;
    else if (relevant) fn++;
  }
  return {
    precision: tp + fp === 0 ? 1 : tp / (tp + fp),
    recall: tp + fn === 0 ? 1 : tp / (tp + fn),
  };
}

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

describe.skipIf(!apiKey)(`Skill classifier evals (${model})`, () => {
  let results: EvalResult[];

  beforeAll(async () => {
    const classifier = new OpenAiSkillClassifier(new OpenAI({ apiKey }), model);
    results = await Promise.all(
      SKILL_CLASSIFIER_EVAL_CASES.map(async ({ title, expected }) => {
        try {
          return { title, expected, actual: await classifier.classify(title) };
        } catch (error) {
          return { title, expected, actual: null, error: String(error) };
        }
      }),
    );

    const failures = results.filter((r) => !r.actual || !sameSkills(r.expected, r.actual));
    if (failures.length) {
      console.table(
        failures.map((r) => ({
          title: r.title,
          expected: r.expected.join(', ') || '(none)',
          actual: r.error ?? (r.actual!.join(', ') || '(none)'),
        })),
      );
    }
  }, 120_000);

  it(`exact-match accuracy is at least ${pct(minAccuracy)}`, () => {
    const correct = results.filter((r) => r.actual && sameSkills(r.expected, r.actual)).length;
    const accuracy = correct / results.length;
    console.log(`Exact-match accuracy: ${correct}/${results.length} (${pct(accuracy)})`);

    expect(accuracy).toBeGreaterThanOrEqual(minAccuracy);
  });

  it.each(Object.values(Skills))(`%s precision and recall meet the thresholds`, (skill) => {
    const { precision, recall } = skillMetrics(results, skill);
    console.log(`${skill}: precision ${pct(precision)}, recall ${pct(recall)}`);

    expect(precision).toBeGreaterThanOrEqual(minPrecision);
    expect(recall).toBeGreaterThanOrEqual(minRecall);
  });
});
