import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, mocked, within } from 'storybook/test';

import type { DeveloperDto } from '#shared/dtos/developers/developer.dto';
import type { TaskDto } from '#shared/dtos/tasks/task.dto';
import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

import { fetchDevelopers } from '../../../api/developers';
import { fetchTasks } from '../../../api/tasks';
import TaskTable from './TaskTable';

const developers: DeveloperDto[] = [
  { id: 1, name: 'Avery Chen', skills: [Skills.BACKEND, Skills.FRONTEND] },
  { id: 2, name: 'Morgan Patel', skills: [Skills.BACKEND] },
];

const tasks: TaskDto[] = [
  {
    id: 1,
    title: 'Build task assignment view',
    status: TaskStatus.IN_PROGRESS,
    skillsRequired: [Skills.FRONTEND],
    assignedTo: developers[0],
  },
  {
    id: 2,
    title: 'Add assignment API validation',
    status: TaskStatus.TODO,
    skillsRequired: [Skills.BACKEND],
    assignedTo: null,
  },
];

const meta = {
  title: 'Task List/Task Table',
  component: TaskTable,
  tags: ['autodocs'],
  beforeEach: () => {
    mocked(fetchTasks).mockResolvedValue(tasks);
    mocked(fetchDevelopers).mockResolvedValue(developers);
  },
} satisfies Meta<typeof TaskTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByRole('row', { name: /Build task assignment view/ });
    const table = canvas.getByRole('table');

    await expect(canvas.getAllByRole('columnheader')).toHaveLength(4);
    await expect(canvas.getByRole('columnheader', { name: 'Task Title' })).toBeInTheDocument();
    await expect(canvas.getByRole('columnheader', { name: 'Skills' })).toBeInTheDocument();
    await expect(canvas.getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
    await expect(canvas.getByRole('columnheader', { name: 'Assignee' })).toBeInTheDocument();

    const assignedTaskRow = within(table).getByRole('row', {
      name: /Build task assignment view/,
    });
    await expect(assignedTaskRow).toHaveTextContent('Frontend');
    await expect(assignedTaskRow).toHaveTextContent('In Progress');
    await expect(assignedTaskRow).toHaveTextContent('Avery Chen');

    const unassignedTaskRow = within(table).getByRole('row', {
      name: /Add assignment API validation/,
    });
    await expect(unassignedTaskRow).toHaveTextContent('Backend');
    await expect(unassignedTaskRow).toHaveTextContent('To Do');

    await expect(canvas.getAllByRole('row')).toHaveLength(3);
    await expect(canvas.getAllByRole('combobox')).toHaveLength(4);
  },
};
