import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useArgs } from 'storybook/internal/preview-api';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import ErrorSnackbar from './ErrorSnackbar';

const meta = {
  title: 'Components/Error Snackbar',
  component: ErrorSnackbar,
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorSnackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    open: true,
    onClose: () => undefined,
    message: 'Unable to save the task. Please try again.',
  },
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs();
    const onClose = () => updateArgs({ open: false });

    return <ErrorSnackbar {...args} open={open} onClose={onClose} />;
  },
};

export const TestClose: Story = {
  args: {
    open: true,
    onClose: () => undefined,
    message: 'Unable to save the task. Please try again.',
  },
  render: function Render(args) {
    const [isOpen, setOpen] = useState(args.open);

    return <ErrorSnackbar {...args} open={isOpen} onClose={() => setOpen(false)} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => expect(canvas.getByRole('alert')).toBeVisible());
    await userEvent.click(canvas.getByRole('button', { name: 'close' }));
    await waitFor(() => expect(canvas.queryByRole('alert')).not.toBeVisible());
  },
};
