import { Skills } from '#shared/skills.constants';
import { TaskStatus } from '#shared/task-status.constants';

export { TaskStatus } from '#shared/task-status.constants';

type TaskProps = {
  id: number | null;
  title: string;
  status: TaskStatus;
  skillsRequired: Skills[];
  assignedTo: number | null;
  subtaskOf: number | null;
};

export class Task {
  private constructor(private _props: TaskProps) {}

  static create(props: TaskProps): Task {
    return new Task(props);
  }

  get props(): TaskProps {
    return { ...this._props };
  }

  setId(id: number) {
    if (this._props.id !== null) {
      throw new Error('ID is already set');
    }
    this._props.id = id;
  }

  setAssignedTo(assignedTo: number | null) {
    this._props.assignedTo = assignedTo;
  }

  updateStatus(status: TaskStatus) {
    this._props.status = status;
  }
}
