import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skills } from '#shared/skills.constants';

import AssigneeSelect from './AssigneeSelect';

const meta = {
  title: 'Task List/Assignee Select',
  component: AssigneeSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof AssigneeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Assigned: Story = {
  args: {
    taskId: 1,
    value: { id: 1, name: 'Avery Chen', skills: [Skills.BACKEND, Skills.FRONTEND] },
  },
};

export const Unassigned: Story = {
  args: { taskId: 2, value: null },
};
