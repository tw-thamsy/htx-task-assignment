## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test:unit

# integration tests (requires PostgreSQL settings in .env)
$ npm run test:integration

# e2e tests
$ npm run test:e2e

# skill classifier evals (calls the OpenAI API, requires OPENAI_API_KEY)
$ npm run test:eval

# test coverage
$ npm run test:cov
```

## AI skill classification

When a task is created without `skillsRequired` (omitted or empty), the backend asks an
OpenAI model to classify the title as needing `Frontend`, `Backend`, both or neither
(see `src/modules/skill-classifier`). Explicitly provided skills are always kept as-is.

| Variable                        | Description                                                   |
| ------------------------------- | ------------------------------------------------------------- |
| `OPENAI_API_KEY`                | Enables classification. If unset, tasks default to no skills. |
| `OPENAI_SKILL_CLASSIFIER_MODEL` | Model to use (default `gpt-5.4-mini`).                        |

If the OpenAI call fails, the error is logged and the task is created with no skills.

### Evals

`npm run test:eval` runs the classifier against the labelled dataset in
`src/modules/skill-classifier/evals/skill-classifier.dataset.ts` and fails if exact-match
accuracy or per-skill precision/recall drop below 85%. Override thresholds with
`SKILL_CLASSIFIER_EVAL_MIN_ACCURACY`, `SKILL_CLASSIFIER_EVAL_MIN_PRECISION` and
`SKILL_CLASSIFIER_EVAL_MIN_RECALL`. The suite is skipped when `OPENAI_API_KEY` is not set.
