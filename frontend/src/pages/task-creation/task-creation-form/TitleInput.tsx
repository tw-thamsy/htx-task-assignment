import { TextField } from '@mui/material';

import { validateTitle } from './TitleInput.utils';

export interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  showError?: boolean;
  disabled?: boolean;
}

export default function TitleInput({
  value,
  onChange,
  showError = false,
  disabled = false,
}: TitleInputProps) {
  const error = showError ? validateTitle(value) : '';

  return (
    <TextField
      label="Title"
      variant="outlined"
      fullWidth
      required
      value={value}
      onChange={(event) => onChange(event.target.value)}
      error={Boolean(error)}
      helperText={error}
      disabled={disabled}
    />
  );
}
