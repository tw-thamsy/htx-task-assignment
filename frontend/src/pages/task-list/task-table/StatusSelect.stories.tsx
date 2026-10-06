import type { Meta, StoryObj } from '@storybook/react-vite';

import { TaskStatus } from '#shared/task-status.constants';

import StatusSelect from './StatusSelect';

const meta = {
  title: 'Task List/Status Select',
  component: StatusSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof StatusSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { taskId: 1, value: TaskStatus.TODO },
};
