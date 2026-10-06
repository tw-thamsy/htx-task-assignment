import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/internal/preview-api';

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
