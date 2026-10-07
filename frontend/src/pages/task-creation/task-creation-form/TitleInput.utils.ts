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
