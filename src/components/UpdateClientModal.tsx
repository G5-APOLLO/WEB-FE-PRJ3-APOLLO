import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ClientForm from './UpdateClientForm';
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { fetchClientById, updateClient, fetchContactByName } from '../services/createClient.service';
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
      } catch (error) {
        toast.error("Error loading client data");
      } finally {
        setLoading(false);
      }
    };

    if (open && clientId) {
      fetchClientData();
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
            const contactData = await fetchContactByName(contact.firstName);
            if (!contactData || !contactData.id) {
              throw new Error(`Contact "${contact.firstName}" not found`);
            }
            return contactData.id;
          })
        );

        const updatedClient = await updateClient({ ...client, contacts: contactIds });
        toast.success("Client updated successfully");
        onClientUpdated(updatedClient);
        onClose();
      }
    } catch (error) {
      toast.error("Error updating client or contact not found");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle className="text-center text-2xl font-bold">Update Client</DialogTitle>
        <DialogContent dividers>
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorComponent message={error} />
          ) : client ? (
            <ClientForm
              client={client}
              onChange={handleClientChange}
              onContactsChange={handleContactsChange}
              onFormValidityChange={handleFormValidityChange}
              contacts={contacts}
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
    </>
  );
};

export default UpdateClientModal;
