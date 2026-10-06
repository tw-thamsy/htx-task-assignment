import { TextField } from '@mui/material';

export interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  showError?: boolean;
  disabled?: boolean;
}

export function validateTitle(value: string): string {
  const trimmedTitle = value.trim();
  if (trimmedTitle.length === 0) {
    return 'Title is required';
  }
  if (trimmedTitle.length > 255) {
    return 'Title must be 255 characters or fewer';
  }
  return '';
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
