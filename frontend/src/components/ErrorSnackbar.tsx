import CloseIcon from '@mui/icons-material/Close';
import { Snackbar, Alert, IconButton } from '@mui/material';

export default function ErrorSnackbar({
  open,
  onClose,
  message,
}: {
  open: boolean;
  onClose: () => void;
  message: string;
}) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
