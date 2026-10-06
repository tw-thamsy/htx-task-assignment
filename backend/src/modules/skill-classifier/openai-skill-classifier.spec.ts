import { Skills } from '#shared/skills.constants';

import { OpenAiSkillClassifier, parseSkills } from './openai-skill-classifier.js';
import { SKILL_CLASSIFIER_SYSTEM_PROMPT } from './skill-classifier.prompt.js';

function mockClient(content: string | null) {
  const create = vi
    .fn<(body: unknown) => Promise<unknown>>()
    .mockResolvedValue({ choices: [{ message: { content } }] });
  return { client: { chat: { completions: { create } } } as never, create };
}

describe('OpenAiSkillClassifier', () => {
  it('sends the task title with the system prompt and a strict json schema', async () => {
    const { client, create } = mockClient('{"skills":["Frontend"]}');
    const classifier = new OpenAiSkillClassifier(client, 'test-model');

    await classifier.classify('Build login page');

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'test-model',
        messages: [
          { role: 'system', content: SKILL_CLASSIFIER_SYSTEM_PROMPT },
          { role: 'user', content: 'Build login page' },
        ],
        response_format: expect.objectContaining({
          type: 'json_schema',
          json_schema: expect.objectContaining({ strict: true }),
        }),
      }),
    );
  });

  it.each([
    ['{"skills":["Frontend"]}', [Skills.FRONTEND]],
    ['{"skills":["Backend"]}', [Skills.BACKEND]],
    ['{"skills":["Frontend","Backend"]}', [Skills.FRONTEND, Skills.BACKEND]],
    ['{"skills":[]}', []],
  ])('returns the skills from the model response %s', async (content, expected) => {
    const { client } = mockClient(content);

    await expect(new OpenAiSkillClassifier(client).classify('task')).resolves.toEqual(expected);
  });

  it('throws when the model returns no content', async () => {
    const { client } = mockClient(null);

    await expect(new OpenAiSkillClassifier(client).classify('task')).rejects.toThrow(
      'Skill classifier returned an empty response',
    );
  });
});

describe('parseSkills', () => {
  it('drops unknown skills and duplicates', () => {
    expect(parseSkills('{"skills":["Backend","DevOps","Backend"]}')).toEqual([Skills.BACKEND]);
  });

  it('throws when the response does not contain a skills array', () => {
    expect(() => parseSkills('{"foo":[]}')).toThrow('invalid response');
    expect(() => parseSkills('null')).toThrow('invalid response');
  });

  it('throws when the response is not json', () => {
    expect(() => parseSkills('not json')).toThrow(SyntaxError);
  });
});
