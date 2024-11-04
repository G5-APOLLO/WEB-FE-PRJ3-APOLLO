// components/UpdateClientModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ClientForm from './ClientForm';
import { fetchClientById, updateClient } from '../services/createClient.service'; // Asegúrate de tener estos servicios
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

  // Cargar los datos del cliente al abrir el modal
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientData = await fetchClientById(clientId); // Llama al servicio para obtener los datos del cliente
        setClient(clientData);
      } catch (error) {
        alert('Error loading client data');
      }
    };

    if (open) {
      fetchClientData();
    }
  }, [clientId, open]);

  // Validar el formulario cada vez que los datos del cliente cambien
  useEffect(() => {
    const validateForm = () => {
      return client && client.nit !== '' && client.name !== '' && client.email !== '';
    };
    setIsFormValid(validateForm());
  }, [client]);

  const handleClientChange = (updatedClient: ListClietnType) => {
    setClient(updatedClient);
  };

  const handleUpdateClient = async () => {
    if (!isFormValid) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    try {
      if (client) {
        const updatedClient = await updateClient(clientId, client); // Actualiza el cliente
        alert('Client updated successfully');
        onClientUpdated(updatedClient); // Actualiza la lista en ClientTable
        onClose(); // Cierra el modal
      }
    } catch (error) {
      alert('Error updating client');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-center text-2xl font-bold">Actualizar Cliente</DialogTitle>
      <DialogContent dividers>
        {client ? (
          <ClientForm client={client} onChange={handleClientChange} />
        ) : (
          <p>Cargando datos del cliente...</p>
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
