import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, mocked, userEvent, waitFor, within } from 'storybook/test';

import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

import { createTask } from '../../../api/tasks';
import TaskCreationForm from './TaskCreationForm';

const meta = {
  title: 'Task Creation/Task Creation Form',
  component: TaskCreationForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/tasks/create']}>
        <Routes>
          <Route path="/tasks/create" element={<Story />} />
          <Route path="/" element={<h1>Tasks</h1>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  beforeEach: () => {
    mocked(createTask).mockReset();
    mocked(createTask).mockResolvedValue({
      id: 1,
      title: 'New task',
      skillsRequired: [],
      status: TaskStatus.TODO,
      assignedTo: null,
    });
  },
} satisfies Meta<typeof TaskCreationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', { name: 'Title' })).toHaveValue('');
    await expect(canvas.getByRole('combobox', { name: 'Skills Required' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Submit' })).toBeEnabled();
  },
};

export const RequiredTitle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('textbox', { name: 'Title' });
    const submit = canvas.getByRole('button', { name: 'Submit' });

    await userEvent.click(submit);
    await expect(title).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('Title is required')).toBeVisible();
    await expect(createTask).not.toHaveBeenCalled();

    await userEvent.type(title, '   ');
    await userEvent.click(submit);
    await expect(canvas.getByText('Title is required')).toBeVisible();
    await expect(createTask).not.toHaveBeenCalled();
  },
};

export const TitleTooLong: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('textbox', { name: 'Title' });
    await userEvent.click(title);
    await userEvent.paste('a'.repeat(256));
    await expect(
      canvas.queryByText('Title must be 255 characters or fewer'),
    ).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

    await expect(title).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('Title must be 255 characters or fewer')).toBeVisible();
    await expect(createTask).not.toHaveBeenCalled();
  },
};

export const SuccessfulCreation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.type(canvas.getByRole('textbox', { name: 'Title' }), '  New task  ');
    await userEvent.click(canvas.getByRole('combobox', { name: 'Skills Required' }));
    await userEvent.click(await page.findByRole('option', { name: 'Frontend' }));
    await userEvent.click(page.getByRole('option', { name: 'Backend' }));
    await userEvent.keyboard('{Escape}');
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

    await expect(await canvas.findByRole('heading', { name: 'Tasks' })).toBeVisible();
    await expect(createTask).toHaveBeenCalledTimes(1);
    await expect(createTask).toHaveBeenCalledWith({
      title: 'New task',
      skillsRequired: [Skills.FRONTEND, Skills.BACKEND],
    });
  },
};

export const Loading: Story = {
  beforeEach: () => {
    mocked(createTask).mockImplementation(() => new Promise(() => {}));
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('textbox', { name: 'Title' });
    const submit = canvas.getByRole('button', { name: 'Submit' });
    await userEvent.type(title, 'New task');
    await userEvent.click(submit);

    await waitFor(async () => {
      await expect(submit).toBeDisabled();
      await expect(title).toBeDisabled();
    });
    await expect(canvas.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
    await userEvent.keyboard('{Enter}');
    await expect(createTask).toHaveBeenCalledTimes(1);
    await expect(canvas.queryByRole('heading', { name: 'Tasks' })).not.toBeInTheDocument();
  },
};

export const FailedCreation: Story = {
  beforeEach: () => {
    mocked(createTask).mockRejectedValueOnce(new Error('Unable to save task'));
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox', { name: 'Title' }), 'New task');
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

    await expect(await canvas.findByRole('alert')).toHaveTextContent(
      'Failed to create task: Unable to save task',
    );
    await expect(canvas.getByRole('textbox', { name: 'Title' })).toHaveValue('New task');
    await expect(canvas.queryByRole('heading', { name: 'Tasks' })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'close' }));
    await waitFor(async () => {
      await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    });

    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
    await expect(await canvas.findByRole('heading', { name: 'Tasks' })).toBeVisible();
    await expect(createTask).toHaveBeenCalledTimes(2);
  },
};
