import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, within, userEvent } from 'storybook/test';

import TaskCreationFormWoSubmit from './TaskCreationFormWoSubmit';

const meta = {
  title: 'Task Creation/Task Creation Form Wo Submit',
  component: TaskCreationFormWoSubmit,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    showError: false,
    isDisabled: false,
  },
} satisfies Meta<typeof TaskCreationFormWoSubmit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    showError: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('textbox', { name: 'Title' });
    await expect(title).toHaveValue('');
    await expect(title).toBeRequired();
    await expect(title).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.queryByText('Title is required')).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('textbox', { name: 'Title' });
    await expect(title).toBeDisabled();
    const skillsRequired = canvas.getByRole('combobox', { name: 'Skills Required' });
    await expect(skillsRequired).toHaveAttribute('aria-disabled', 'true');
  },
};

export const WithSubtasks: Story = {
  args: {
    onChange: fn(),
    showError: false,
    isDisabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addSubtaskButton = canvas.getByRole('button', { name: 'Add Subtask' });
    await expect(addSubtaskButton).toBeInTheDocument();

    await userEvent.click(addSubtaskButton);
    const titles = canvas.getAllByRole('textbox', { name: 'Title' });
    await expect(titles).toHaveLength(2);

    const subtaskAddSubtaskButton = canvas.getAllByRole('button', { name: 'Add Subtask' })[1];
    await expect(subtaskAddSubtaskButton).toBeInTheDocument();
    await userEvent.click(subtaskAddSubtaskButton);
    const subtaskTitles = canvas.getAllByRole('textbox', { name: 'Title' });
    await expect(subtaskTitles).toHaveLength(3);
  },
};
