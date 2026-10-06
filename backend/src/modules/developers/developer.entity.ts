import { Skills } from '../skills/skills.constants.js';

type DeveloperProps = {
  id: number | null;
  name: string;
  skills: Skills[];
};

export class Developer {
  private constructor(private readonly _props: DeveloperProps) {}

  static create(props: DeveloperProps): Developer {
    return new Developer({ ...props, skills: [...props.skills] });
  }

  get props(): DeveloperProps {
    return { ...this._props, skills: [...this._props.skills] };
  }

  setId(id: number): void {
    if (this._props.id !== null) {
      throw new Error('ID is already set');
    }
    this._props.id = id;
  }
}
