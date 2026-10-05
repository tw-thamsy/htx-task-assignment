export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

type TaskProps = {
  id: number | null;
  title: string;
  status: TaskStatus;
  assignedTo: number | null;
};

export class Task {
  private constructor(
    private _props: TaskProps
  ) {}

  static create(props: TaskProps): Task {
    return new Task(props);
  }

  setAssignedTo(assignedTo: number | null) {
    this._props.assignedTo = assignedTo;
  }

  get props(): TaskProps {
    return {...this._props};
  }

  setId(id: number) {
    if (this._props.id !== null) {
      throw new Error('ID is already set');
    }
    this._props.id = id;
  }
}