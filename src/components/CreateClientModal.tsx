import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ClientForm from './ClientForm';
import { createClient, fetchContactByName } from '../services/createClient.service';
import { ListClientType, Contact } from '../types/ListClient.type';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      toast.error("Please complete all required fields.");
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
      toast.success("Client created successfully!");
      onClientCreated(newClient);
      setClient(initialClientState);
      setContacts([]);
      onClose();
    } catch {
      toast.error("Error creating client or contact not found.");
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
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateClientModal;
