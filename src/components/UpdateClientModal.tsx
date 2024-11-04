// components/UpdateClientModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ClientForm from './ClientForm';
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { fetchClientById, updateClient } from '../services/createClient.service';
import { ListClietnType } from '../types/ListClient.type';

type UpdateClientModalProps = {
  open: boolean;
  onClose: () => void;
  clientId: number;
  onClientUpdated: (client: ListClietnType) => void;
};

const UpdateClientModal: React.FC<UpdateClientModalProps> = ({ open, onClose, clientId, onClientUpdated }) => {
  const [client, setClient] = useState<ListClietnType | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      setLoading(true);
      setError(null);
      try {
        const clientData: ListClietnType = await fetchClientById(clientId);
        setClient(clientData);
      } catch (error) {
        setError('Error loading client data'); 
      } finally {
        setLoading(false);
      }
    };

    if (open && clientId) {
      fetchClientData();
    }
  }, [clientId, open]);

  useEffect(() => {
    const validateForm = () => {
      return client !== null && client.nit !== '' && client.name !== '' && client.email !== '';
    };
    setIsFormValid(validateForm());
  }, [client]);

  const handleClientChange = (updatedClient: ListClietnType) => {
    setClient(updatedClient);
  };

  const handleUpdateClient = async () => {
    if (!isFormValid) {
      alert('Please complete all required fields');
      return;
    }

    try {
      if (client) {
        const updatedClient = await updateClient(client);
        alert('Client updated successfully');
        onClientUpdated(updatedClient);
        onClose();
      }
    } catch (error) {
      setError('Error updating client');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-center text-2xl font-bold">Update Client</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorComponent message={error} />
        ) : client ? (
          <ClientForm client={client} onChange={handleClientChange} />
        ) : (
          <p>Error: Client not found</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdateClient} color="primary" variant="contained" disabled={!isFormValid}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateClientModal;
