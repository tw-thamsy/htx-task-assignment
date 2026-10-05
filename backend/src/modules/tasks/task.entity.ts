export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class Task {
  readonly id: number;
  readonly title: string;
  readonly status: TaskStatus;
  readonly assignedTo: number | null;
}