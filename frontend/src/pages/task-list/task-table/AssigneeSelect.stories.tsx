import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, mocked, within, userEvent, waitFor } from 'storybook/test';

import { Skills } from '#shared/skills.constants';

import { fetchDevelopers } from '../../../api/developers';
import { assignTask } from '../../../api/tasks';
import AssigneeSelect from './AssigneeSelect';

const developers = [
  { id: 1, name: 'Avery Chen', skills: [Skills.BACKEND, Skills.FRONTEND] },
  { id: 2, name: 'Jordan Lee', skills: [Skills.FRONTEND] },
  { id: 3, name: 'Taylor Smith', skills: [] },
];

const meta = {
  title: 'Task List/Assignee Select',
  component: AssigneeSelect,
  tags: ['autodocs'],
  beforeEach: () => {
    mocked(fetchDevelopers).mockResolvedValue(developers);
    mocked(assignTask).mockResolvedValue(undefined);
  },
} satisfies Meta<typeof AssigneeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Assigned: Story = {
  args: {
    taskId: 1,
    value: developers[0],
  },

  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const select = canvas.getByRole('combobox');

    await expect(select).toHaveTextContent(developers[0].name);
    await userEvent.click(select);
    await userEvent.click(await page.findByRole('option', { name: developers[1].name }));

    await waitFor(async () => {
      await expect(assignTask).toHaveBeenCalledTimes(1);
      await expect(assignTask).toHaveBeenCalledWith(args.taskId, developers[1].id);
      await expect(select).toHaveTextContent(developers[1].name);
    });
  },
};

export const Unassigned: Story = {
  args: { taskId: 2, value: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    // \u200B is the Unicode escape for U+200B ZERO WIDTH SPACE. It’s an invisible character; MUI inserts it in an empty Select to preserve layout.
    await expect(select.textContent?.replace(/\u200B/g, '')).toBe('');
  },
};

export const Loading: Story = {
  args: { taskId: 1, value: developers[0] },
  beforeEach: () => {
    mocked(assignTask).mockImplementation(() => new Promise(() => {}));
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const select = canvas.getByRole('combobox');

    await userEvent.click(select);
    await userEvent.click(await page.findByRole('option', { name: developers[1].name }));

    await waitFor(async () => {
      await expect(assignTask).toHaveBeenCalledTimes(1);
      await expect(assignTask).toHaveBeenCalledWith(args.taskId, developers[1].id);
    });
    await expect(select).toHaveTextContent(developers[0].name);
    await expect(select).toHaveAttribute('aria-disabled', 'true');
  },
};

export const FailedUpdate: Story = {
  args: {
    taskId: 1,
    value: developers[2],
  },
  beforeEach: () => {
    mocked(assignTask).mockRejectedValue(new Error('Unable to assign task'));
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const select = canvas.getByRole('combobox');

    await expect(select).toHaveTextContent(developers[2].name);
    await userEvent.click(select);
    await userEvent.click(await page.findByRole('option', { name: developers[1].name }));

    await waitFor(async () => {
      await expect(assignTask).toHaveBeenCalledTimes(1);
      await expect(assignTask).toHaveBeenCalledWith(args.taskId, developers[1].id);
      await expect(canvas.getByRole('alert')).toBeVisible();
    });
    await expect(canvas.getByRole('alert')).toHaveTextContent(
      'Failed to update task assignee: Unable to assign task',
    );
    await expect(select).toHaveTextContent(developers[2].name);
  },
};

export const TestValuePopulated_WhenListNotLoaded: Story = {
  args: {
    taskId: 3,
    value: developers[1],
  },
  beforeEach: () => {
    mocked(fetchDevelopers).mockImplementation(() => new Promise(() => {}));
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const select = canvas.getByRole('combobox');

    await expect(select).toHaveTextContent(developers[1].name);
    await userEvent.click(select);
    await waitFor(async () => {
      await expect(page.findByRole('option', { name: developers[1].name })).toBeTruthy();
    });
    await expect(page.queryByRole('option', { name: developers[0].name })).not.toBeInTheDocument();
  },
};
