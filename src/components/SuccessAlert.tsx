// components/SuccessAlert.tsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

type SuccessAlertProps = {
  open: boolean;
  onClose: () => void;
  message: string;
};

const SuccessAlert: React.FC<SuccessAlertProps> = ({ open, onClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
