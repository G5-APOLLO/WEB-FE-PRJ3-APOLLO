import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrackingActivity } from '../types/TrackingActivity.type';
import CreateTrackingActivityForm from './CreateTrackingActivityForm';
import { useCreateTrackingActivity } from '../hooks/useCreateTrackingActivity';

interface CreateTrackingActivityModalProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: (newActivity: TrackingActivity) => void;
}

const CreateTrackingActivityModal: React.FC<CreateTrackingActivityModalProps> = ({ open, onClose, onCreateSuccess }) => {
  const { createActivity, isLoading } = useCreateTrackingActivity(onClose, onCreateSuccess);

  const handleSave = (activity: TrackingActivity) => {
    createActivity(activity);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle className="text-center text-2xl font-bold">
          New Tracking Activity
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
            disabled={isLoading}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <CreateTrackingActivityForm onSave={handleSave} onCancel={onClose} isLoading={isLoading} />
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default CreateTrackingActivityModal;
