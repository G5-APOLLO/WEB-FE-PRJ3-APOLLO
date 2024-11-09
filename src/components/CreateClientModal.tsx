// components/CreateClientModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ClientForm from './ClientForm';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import { createClient, fetchContactByName } from '../services/createClient.service';
import { ListClientType, Contact } from '../types/ListClient.type';

type CreateClientModalProps = {
  open: boolean;
  onClose: () => void;
  onClientCreated: (client: ListClientType) => void;
};

const CreateClientModal: React.FC<CreateClientModalProps> = ({ open, onClose, onClientCreated }) => {
  const initialClientState: ListClientType = {
    id: null,
    nit: '',
    name: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    active: true,
    contacts: [],
  };

  const [client, setClient] = useState<ListClientType>(initialClientState);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const handleClientChange = (updatedClient: ListClientType) => {
    setClient(updatedClient);
  };

  const handleContactsChange = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
  };

  const handleFormValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleCreateClient = async () => {
    if (!isFormValid) {
      setErrorAlertOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {

      const contactIds: number[] = [];
      for (const contact of contacts) {
        const fetchedContact = await fetchContactByName(contact.firstName + ' ' + contact.lastName);
        if (fetchedContact) {
          contactIds.push(fetchedContact.id);
        } else {
          throw new Error(`Contact "${contact.firstName} ${contact.lastName}" not found`);
        }
      }

      const newClient = await createClient({ ...client, contacts: contactIds });
      setSuccessAlertOpen(true);
      onClientCreated(newClient);
      setClient(initialClientState);
      setContacts([]);
      onClose();
    } catch (error) {
      setErrorAlertOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle className="text-center text-2xl font-bold">New Client</DialogTitle>
        <DialogContent dividers>
          <ClientForm
            client={client}
            onChange={handleClientChange}
            onContactsChange={handleContactsChange}
            onFormValidityChange={handleFormValidityChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateClient}
            color="primary"
            variant="contained"
            disabled={!isFormValid || isSubmitting}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessAlert
        open={successAlertOpen}
        onClose={() => setSuccessAlertOpen(false)}
        message="Client created successfully"
      />
      <ErrorAlert
        open={errorAlertOpen}
        onClose={() => setErrorAlertOpen(false)}
        message="Error creating client or contact not found"
      />
    </>
  );
};

export default CreateClientModal;
