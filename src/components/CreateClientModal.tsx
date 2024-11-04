import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ClientForm from './ClientForm';
import { createClient } from '../services/createClient.service';
import { ListClietnType } from '../types/ListClient.type';

type CreateClientModalProps = {
    open: boolean;
    onClose: () => void;
    onClientCreated: (client: ListClietnType) => void;
  };
  
  const CreateClientModal: React.FC<CreateClientModalProps> = ({ open, onClose, onClientCreated }) => {
    const initialClientState: ListClietnType = {
      id: null,
      nit: '',
      name: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      email: '',
      active: true,
    };
  
    const [client, setClient] = useState<ListClietnType>(initialClientState);
    const [isFormValid, setIsFormValid] = useState(false);
  
    
    const handleClientChange = (updatedClient: ListClietnType) => {
      setClient(updatedClient);
    };
  
    useEffect(() => {
      const validateForm = () => {
        return client.nit !== '' && client.name !== '' && client.email !== '';
      };
  
      setIsFormValid(validateForm());
    }, [client]); 
  
    const handleCreateClient = async () => {
      if (!isFormValid) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
      }
  
      try {
        const newClient = await createClient(client);
        alert('Client created successfully');
        onClientCreated(newClient); 
        setClient(initialClientState); 
        onClose(); 
      } catch (error) {
        alert('Error creating client');
      }
    };
  
    return (
      <Dialog open={open} onClose={() => { setClient(initialClientState); onClose(); }} fullWidth maxWidth="sm">
        <DialogTitle className="text-center text-2xl font-bold">Crear Cliente</DialogTitle>
        <DialogContent dividers>
          <ClientForm client={client} onChange={handleClientChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setClient(initialClientState); onClose(); }} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateClient} color="primary" variant="contained" disabled={!isFormValid}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

export default CreateClientModal;
