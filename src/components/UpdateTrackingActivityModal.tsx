import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateTrackingActivityForm from './UpdateTrackingActivityForm';
import { fetchTrackingActivityById, updateTrackingActivity } from '../services/trackingActivity.service';
import { fetchClients } from '../services/createClient.service';
import { useGetOpportunities } from '../hooks/useGetOpportunities';
import { TrackingActivity } from '../types/TrackingActivity.type';
import CircularProgress from '@mui/joy/CircularProgress';

interface UpdateTrackingActivityModalProps {
  open: boolean;
  onClose: () => void;
  activityId?: number;
  onActivityUpdated: (activity: TrackingActivity) => void;
}

const UpdateTrackingActivityModal: React.FC<UpdateTrackingActivityModalProps> = ({
  open,
  onClose,
  activityId,
  onActivityUpdated,
}) => {
  const [activity, setActivity] = useState<TrackingActivity | null>(null);
  const [clients, setClients] = useState<{ id: number; name: string; contacts: number[] }[]>([]);
  const [associatedContacts, setAssociatedContacts] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: opportunities } = useGetOpportunities();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (!activityId) throw new Error('Activity ID is undefined');
        
        // Fetch activity details
        const activityData = await fetchTrackingActivityById(activityId);
        setActivity(activityData);

        // Fetch clients and contacts
        const clientData = await fetchClients();
        setClients(clientData.filter(client => client.id !== null) as { id: number; name: string; contacts: number[] }[]);

        // Find the current opportunity
        const currentOpportunity = opportunities?.find(op => op.id === activityData.opportunityId);
        if (!currentOpportunity) throw new Error('Opportunity not found');

        // Find the client associated with the opportunity
        const client = clientData.find(c => c.id === currentOpportunity.clientIds[0]);
        if (client && Array.isArray(client.contacts)) {
          const contactsForClient = client.contacts
            .map(contactId => {
              const contact = clientData.find(c => c.id === contactId);
              return contact ? { id: contact.id, name: contact.name } : null;
            })
            .filter(contact => contact !== null);
          setAssociatedContacts(contactsForClient as { id: number; name: string }[]);
        }
      } catch {
        toast.error('Error loading activity data');
      } finally {
        setIsLoading(false);
      }
    };

    if (open && activityId) {
      loadData();
    }
  }, [open, activityId, opportunities]);

  const handleUpdateActivity = async () => {
    if (!activity) {
      toast.error('Invalid activity data');
      return;
    }

    console.log("Clientes", clients)

    try {
      const updatedActivity = await updateTrackingActivity(activity);
      toast.success('Activity updated successfully');
      onActivityUpdated(updatedActivity);
      onClose();
    } catch {
      toast.error('Error updating activity');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-center text-2xl font-bold">
        Update Tracking Activity
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
        {isLoading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
            <CircularProgress variant="plain" />
              <div className="text-center mt-4">
                <p>Loading activity...</p>
              </div>
          </Box>
        ) : (
          activity && (
            <UpdateTrackingActivityForm
              activity={activity}
              onChange={setActivity}
              clients={associatedContacts}
            />
          )
        )}
      </DialogContent>
      {!isLoading && (
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateActivity}
            color="primary"
            variant="contained"
            disabled={!activity}
          >
            Update
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default UpdateTrackingActivityModal;
