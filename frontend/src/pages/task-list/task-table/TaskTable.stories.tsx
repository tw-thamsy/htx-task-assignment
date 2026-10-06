import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Decorator } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { DeveloperDto } from '#shared/dtos/developers/developer.dto';
import type { TaskDto } from '#shared/dtos/tasks/task.dto';
import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

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

const withTaskTableData: Decorator = (Story) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });
  queryClient.setQueryData(['tasks'], tasks);
  queryClient.setQueryData(['developers'], developers);

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Task List/Task Table',
  component: TaskTable,
  decorators: [withTaskTableData],
  tags: ['autodocs'],
} satisfies Meta<typeof TaskTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
