import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import UpdateClientForm from './UpdateClientForm';
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { fetchClientById, updateClient, fetchClients } from '../services/createClient.service';
import { ListClientType, Contact } from '../types/ListClient.type';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type UpdateClientModalProps = {
  open: boolean;
  onClose: () => void;
  clientId: number;
  onClientUpdated: (client: ListClientType) => void;
};

const UpdateClientModal: React.FC<UpdateClientModalProps> = ({ open, onClose, clientId, onClientUpdated }) => {
  const [client, setClient] = useState<ListClientType | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [availableClients, setAvailableClients] = useState<ListClientType[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchClientData = async () => {
      setLoading(true);
      setError(null);
      try {
        const clientData: ListClientType = await fetchClientById(clientId);
        setClient(clientData);

        const contactPromises = clientData.contacts ? clientData.contacts.map(async (contactId: number) => {
          const contactData = await fetchClientById(contactId);
          return {
            firstName: contactData.name,
            phone: contactData.phone,
            email: contactData.email
          } as Contact;
        }) : [];

        const contactsData = await Promise.all(contactPromises);
        setContacts(contactsData);
      } catch {
        toast.error("Error loading client data");
      } finally {
        setLoading(false);
      }
    };

    const loadAvailableClients = async () => {
      try {
        const clients = await fetchClients();
        setAvailableClients(clients);
      } catch {
        toast.error("Error fetching clients for selection");
      }
    };

    if (open && clientId) {
      fetchClientData();
      loadAvailableClients();
    }
  }, [clientId, open]);

  const handleClientChange = (updatedClient: ListClientType) => {
    setClient(updatedClient);
  };

  const handleContactsChange = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
  };

  const handleFormValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleUpdateClient = async () => {
    if (!isFormValid || isSubmitting || !client ||
      client.nit.trim() === "" ||
      client.name.trim() === "" ||
      client.address.trim() === "" ||
      client.city.trim() === "" ||
      client.country.trim() === "" ||
      client.email.trim() === "") {
      toast.error("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (client) {
        const contactIds = await Promise.all(
          contacts.map(async (contact) => {
            const contactData = await fetchClients();
            if (!contactData || !contactData.some(c => c.name === contact.firstName)) {
              throw new Error(`Contact "${contact.firstName}" not found`);
            }
            return contactData.find(c => c.name === contact.firstName)?.id;
          })
        );

        const updatedClient = await updateClient({ ...client, contacts: contactIds as number[] });
        toast.success("Client updated successfully");
        onClientUpdated(updatedClient);
        onClose();
      }
    } catch {
      toast.error("Error updating client or contact not found");
    } finally {
      setIsSubmitting(false);
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
          <UpdateClientForm
            client={client}
            onChange={handleClientChange}
            onContactsChange={handleContactsChange}
            onFormValidityChange={handleFormValidityChange}
            contacts={contacts}
            availableClients={availableClients} // Pass the available clients here
          />
        ) : (
          <p>Error: Client not found</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdateClient} color="primary" variant="contained" disabled={!isFormValid || isSubmitting}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateClientModal;
