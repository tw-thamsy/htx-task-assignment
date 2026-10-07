import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, within } from 'storybook/test';

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
