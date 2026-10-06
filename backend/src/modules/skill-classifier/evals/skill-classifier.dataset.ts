import { Skills } from '#shared/skills.constants';

export type SkillClassifierEvalCase = {
  title: string;
  expected: Skills[];
};

const { FRONTEND, BACKEND } = Skills;

export const SKILL_CLASSIFIER_EVAL_CASES: SkillClassifierEvalCase[] = [
  // Frontend only
  { title: 'Fix button alignment on the settings page', expected: [FRONTEND] },
  { title: 'Make the dashboard responsive on mobile', expected: [FRONTEND] },
  { title: 'Add dark mode toggle to the navbar', expected: [FRONTEND] },
  { title: 'Update the color of the primary CTA to match brand guidelines', expected: [FRONTEND] },
  { title: 'Add loading spinner while the task table is fetching', expected: [FRONTEND] },
  { title: 'Improve keyboard navigation and ARIA labels in the modal', expected: [FRONTEND] },
  { title: 'Add client-side validation to the signup form', expected: [FRONTEND] },
  { title: 'Write Storybook stories for the ErrorSnackbar component', expected: [FRONTEND] },
  { title: 'Fix CSS overflow in the sidebar on Safari', expected: [FRONTEND] },
  { title: 'Animate the dropdown menu open and close transitions', expected: [FRONTEND] },

  // Backend only
  { title: 'Add database index on tasks.assigned_to', expected: [BACKEND] },
  { title: 'Create REST endpoint to list developers by skill', expected: [BACKEND] },
  { title: 'Write migration to add due_date column to tasks table', expected: [BACKEND] },
  { title: 'Fix N+1 query when loading tasks with assignees', expected: [BACKEND] },
  { title: 'Add rate limiting to the public API', expected: [BACKEND] },
  { title: 'Set up background job to send daily email digests', expected: [BACKEND] },
  { title: 'Integrate Stripe webhooks for payment confirmation', expected: [BACKEND] },
  { title: 'Cache developer lookups in Redis', expected: [BACKEND] },
  { title: 'Validate JWT tokens in the API gateway middleware', expected: [BACKEND] },
  { title: 'Return 404 when updating a task that does not exist', expected: [BACKEND] },

  // Both
  { title: 'Implement user login with email and password', expected: [FRONTEND, BACKEND] },
  { title: 'Build a task comments feature', expected: [FRONTEND, BACKEND] },
  { title: 'Add file upload for task attachments', expected: [FRONTEND, BACKEND] },
  {
    title: 'Add search bar to the task list backed by a new search API',
    expected: [FRONTEND, BACKEND],
  },
  { title: 'Implement pagination for the task table end to end', expected: [FRONTEND, BACKEND] },
  { title: 'Allow users to edit their profile and save changes', expected: [FRONTEND, BACKEND] },
  { title: 'Build real-time notifications for task assignment', expected: [FRONTEND, BACKEND] },
  { title: 'Add a due date field to tasks and show it in the UI', expected: [FRONTEND, BACKEND] },

  // Neither
  { title: 'Schedule sprint planning meeting', expected: [] },
  { title: 'Interview candidates for the senior engineer role', expected: [] },
  { title: 'Update the README with onboarding instructions', expected: [] },
  { title: 'Renew the company domain name', expected: [] },
  { title: 'Prepare quarterly roadmap presentation', expected: [] },
  { title: 'Write retrospective notes for last sprint', expected: [] },
  { title: 'Misc', expected: [] },
];
