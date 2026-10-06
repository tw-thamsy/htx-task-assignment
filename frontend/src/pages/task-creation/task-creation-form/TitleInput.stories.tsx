import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import TitleInput from './TitleInput';

const meta = {
  title: 'Task Creation/Title Input',
  component: TitleInput,
  tags: ['autodocs'],
  args: {
    value: '',
    onChange: fn(),
    showError: true,
    disabled: false,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <TitleInput
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange(newValue);
        }}
      />
    );
  },
} satisfies Meta<typeof TitleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { showError: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('textbox', { name: 'Title' });
    await expect(title).toHaveValue('');
    await expect(title).toBeRequired();
    await expect(title).toHaveAttribute('aria-invalid', 'false');
    await expect(canvas.queryByText('Title is required')).not.toBeInTheDocument();
  },
};

export const RequiredTitle: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('textbox', { name: 'Title' });
    await expect(title).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('Title is required')).toBeVisible();

    await userEvent.type(title, 'New task');
    await expect(args.onChange).toHaveBeenLastCalledWith('New task');
    await expect(title).toHaveAttribute('aria-invalid', 'false');
    await expect(canvas.queryByText('Title is required')).not.toBeInTheDocument();

    await userEvent.clear(title);
    await expect(canvas.getByText('Title is required')).toBeVisible();
  },
};

export const WhitespaceTitle: Story = {
  args: { value: '   ' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', { name: 'Title' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await expect(canvas.getByText('Title is required')).toBeVisible();
  },
};

export const TitleTooLong: Story = {
  args: { value: 'a'.repeat(256) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('textbox', { name: 'Title' });
    await expect(title).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('Title must be 255 characters or fewer')).toBeVisible();

    await userEvent.click(title);
    await userEvent.keyboard('{End}{Backspace}');
    await expect(title).toHaveValue('a'.repeat(255));
    await expect(title).toHaveAttribute('aria-invalid', 'false');
    await expect(
      canvas.queryByText('Title must be 255 characters or fewer'),
    ).not.toBeInTheDocument();
  },
};

export const TrimmedTitle: Story = {
  args: { value: `  ${'a'.repeat(255)}  ` },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('textbox', { name: 'Title' });
    await expect(title).toHaveValue(args.value);
    await expect(title).toHaveAttribute('aria-invalid', 'false');
  },
};

export const Disabled: Story = {
  args: { value: 'New task', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', { name: 'Title' })).toBeDisabled();
  },
};
