import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import UpdateTrackingActivityForm from './UpdateTrackingActivityForm';
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { fetchTrackingActivityById, updateTrackingActivity } from '../services/trackingActivity.service';
import { TrackingActivity } from './TrackingActivitiesTable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UpdateTrackingActivityModalProps {
  open: boolean;
  onClose: () => void;
  activityId?: number;
  onActivityUpdated: (activity: TrackingActivity) => void;
}

const UpdateTrackingActivityModal: React.FC<UpdateTrackingActivityModalProps> = ({ open, onClose, activityId, onActivityUpdated }) => {
  const [activity, setActivity] = useState<TrackingActivity | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activityId !== undefined) {
          const activityData: TrackingActivity = await fetchTrackingActivityById(activityId);
          setActivity(activityData);
        } else {
          throw new Error('Activity ID is undefined');
        }
      } catch (error) {
        setError('Error loading activity data');
      } finally {
        setLoading(false);
      }
    };

    if (open && activityId) {
      fetchActivityData();
    }
  }, [activityId, open]);

  useEffect(() => {
    const validateForm = () => {
      return activity !== null && activity.opportunityName !== '' && activity.contactType !== '' && activity.contactDate !== '' && activity.clientContact !== '' && activity.salesExecutive !== '' && activity.description !== '';
    };
    setIsFormValid(validateForm());
  }, [activity]);

  const handleActivityChange = (updatedActivity: TrackingActivity) => {
    setActivity(updatedActivity);
  };

  const handleUpdateActivity = async () => {
    if (!isFormValid) {
      alert('Please complete all required fields');
      return;
    }

    try {
      if (activity) {
        const updatedActivity = await updateTrackingActivity(activity);
        toast.success('Activity updated successfully');
        onActivityUpdated(updatedActivity);
        onClose();
      }
    } catch (error) {
      setError('Error updating activity');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-center text-2xl font-bold">Update Activity</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorComponent message={error} />
        ) : activity ? (
          <UpdateTrackingActivityForm activity={activity} onChange={handleActivityChange} />
        ) : (
          <p>Error: Activity not found</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdateActivity} color="primary" variant="contained" disabled={!isFormValid}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTrackingActivityModal;