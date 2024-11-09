// components/ErrorAlert.tsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

type ErrorAlertProps = {
  open: boolean;
  onClose: () => void;
  message: string;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({ open, onClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
