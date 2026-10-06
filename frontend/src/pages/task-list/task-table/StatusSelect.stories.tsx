import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, mocked, userEvent, waitFor, within } from 'storybook/test';

import { TaskStatus } from '#shared/task-status.constants';

import { updateTaskStatus } from '../../../api/tasks';
import StatusSelect from './StatusSelect';

const meta = {
  title: 'Task List/Status Select',
  component: StatusSelect,
  tags: ['autodocs'],
  beforeEach: () => {
    mocked(updateTaskStatus).mockReset();
    mocked(updateTaskStatus).mockResolvedValue(undefined);
  },
} satisfies Meta<typeof StatusSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { taskId: 1, value: TaskStatus.TODO },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const select = canvas.getByRole('combobox');

    await expect(select).toHaveTextContent('To Do');
    await userEvent.click(select);
    await userEvent.click(await page.findByRole('option', { name: 'In Progress' }));

    await waitFor(async () => {
      await expect(updateTaskStatus).toHaveBeenCalledTimes(1);
      await expect(updateTaskStatus).toHaveBeenCalledWith(args.taskId, TaskStatus.IN_PROGRESS);
      await expect(select).toHaveTextContent('In Progress');
    });
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: { taskId: 1, value: TaskStatus.IN_PROGRESS },
  beforeEach: () => {
    mocked(updateTaskStatus).mockImplementation(() => new Promise(() => {}));
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const select = canvas.getByRole('combobox');

    await userEvent.click(select);
    await userEvent.click(await page.findByRole('option', { name: 'Done' }));

    await waitFor(async () => {
      await expect(updateTaskStatus).toHaveBeenCalledTimes(1);
      await expect(updateTaskStatus).toHaveBeenCalledWith(args.taskId, TaskStatus.DONE);
    });
    await expect(select).toHaveTextContent('In Progress');
    await expect(select).toHaveAttribute('aria-disabled', 'true');
  },
};

export const FailedUpdate: Story = {
  args: { taskId: 1, value: TaskStatus.TODO },
  beforeEach: () => {
    mocked(updateTaskStatus).mockRejectedValue(new Error('Unable to save status'));
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const select = canvas.getByRole('combobox');

    await userEvent.click(select);
    await userEvent.click(await page.findByRole('option', { name: 'Done' }));

    await waitFor(async () => {
      await expect(updateTaskStatus).toHaveBeenCalledTimes(1);
      await expect(updateTaskStatus).toHaveBeenCalledWith(args.taskId, TaskStatus.DONE);
      await expect(canvas.getByRole('alert')).toBeVisible();
    });
    await expect(canvas.getByRole('alert')).toHaveTextContent(
      'Failed to update task status: Unable to save status',
    );
    await expect(select).toHaveTextContent('To Do');
  },
};
