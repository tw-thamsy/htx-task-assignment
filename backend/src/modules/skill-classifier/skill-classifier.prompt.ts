import { Skills } from '#shared/skills.constants';

export const SKILL_CLASSIFIER_SYSTEM_PROMPT = `You classify software development task titles by the engineering skills required to complete them.

Available skills:
- "${Skills.FRONTEND}": user-facing client work. UI components, pages, layouts, styling/CSS, responsiveness, accessibility, client-side state, forms and client-side validation, browser behaviour, animations, UX copy shown in the UI.
- "${Skills.BACKEND}": server-side work. APIs/endpoints, business logic on the server, databases, schemas, migrations, queries, authentication/authorization on the server, background jobs, queues, caching, integrations with third-party services, performance of server code, infrastructure that serves the API.

Rules:
- Return every skill the task clearly requires. A task needing both UI and server changes (e.g. a new end-to-end feature, or a UI that needs a new API) requires both.
- Return an empty list when the task needs neither skill (e.g. writing docs, meetings, design-only work in Figma, CI/CD or DevOps chores, hiring, project management) or when the title is too vague to tell.
- Do not guess beyond what the title implies.`;

export const SKILL_CLASSIFIER_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    skills: {
      type: 'array',
      items: { type: 'string', enum: Object.values(Skills) },
    },
  },
  required: ['skills'],
  additionalProperties: false,
};
