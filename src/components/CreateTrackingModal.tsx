import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrackingActivity } from '../types/TrackingActivity.type';
import CreateTrackingActivityForm from './CreateTrackingActivityForm';
import { useCreateTrackingActivity } from '../hooks/useCreateTrackingActivity';
import { fetchClients } from '../services/createClient.service';
import { useGetOpportunities } from '../hooks/useGetOpportunities';
import CircularProgress from '@mui/joy/CircularProgress';

interface CreateTrackingActivityModalProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: (newActivity: TrackingActivity) => void;
  opportunityId: number;
}

const CreateTrackingActivityModal: React.FC<CreateTrackingActivityModalProps> = ({
  open,
  onClose,
  onCreateSuccess,
  opportunityId,
}) => {
  const { createActivity, isLoading } = useCreateTrackingActivity(onClose, onCreateSuccess);
  const [clients, setClients] = useState<{ id: number; name: string; contacts: number[] }[]>([]);
  const [associatedContacts, setAssociatedContacts] = useState<{ id: number; name: string }[]>([]);
  const { data: opportunities } = useGetOpportunities();
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      setIsLoadingContacts(true); // Comienza el indicador de carga
      try {
        const clientData = await fetchClients();
        console.log('Clientes cargados:', clientData);

        setClients(
          clientData.map(client => ({
            id: client.id ?? 0,
            name: client.name ?? 'Unknown',
            contacts: Array.isArray(client.contacts) ? client.contacts : [],
          }))
        );

        const currentOpportunity = opportunities?.find(op => op.id === opportunityId);
        console.log('Oportunidad actual:', currentOpportunity);

        if (currentOpportunity) {
          const clientId = currentOpportunity.clientIds[0];
          const client = clientData.find(c => c.id === clientId);
          console.log('Cliente asociado a la oportunidad:', client);

          if (client && Array.isArray(client.contacts)) {
            const contactsForClient = client.contacts
              .map(contactId => {
                const contact = clientData.find(c => c.id === contactId);
                return contact ? { id: contact.id, name: contact.name } : null;
              })
              .filter(contact => contact !== null);

            console.log('Contactos asociados:', contactsForClient);

            setAssociatedContacts(contactsForClient as { id: number; name: string }[]);
          } else {
            console.warn('El cliente no tiene contactos asociados o el campo contacts no es un array');
            setAssociatedContacts([]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingContacts(false); // Finaliza el indicador de carga
      }
    };

    if (open) {
      loadOptions();
    }
  }, [open, opportunityId, opportunities]);


  const handleSave = (activity: TrackingActivity) => {
    const activityWithOpportunity = { ...activity, opportunityId };
    createActivity(activityWithOpportunity);
  };



  console.log('Clientes -> ', clients);

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
          {isLoadingContacts ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px', // Ajusta según sea necesario
              }}
            >
              <CircularProgress variant="plain" />
              <div className="text-center mt-4">
                <p>Loading Form...</p>
              </div>
            </div>
          ) : (
            <CreateTrackingActivityForm
              onSave={handleSave}
              onCancel={onClose}
              isLoading={isLoading}
              clients={associatedContacts}
              isLoadingContacts={isLoadingContacts}
            />
          )}
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );

};

export default CreateTrackingActivityModal;
