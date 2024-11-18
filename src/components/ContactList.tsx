import React from 'react';
import { useContactsData } from '../hooks/useContactsData';
import Spinner from './Spinner';
import ErrorComponent from './Error-component';

interface ContactListProps {
  contactIds: number[];
}

const ContactList: React.FC<ContactListProps> = ({ contactIds }) => {
  const { contacts, isLoading, isError } = useContactsData(contactIds);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorComponent message="Error al cargar los contactos" />;

  return (
    <div>
      {contacts.length > 0 ? (
        <div className="space-y-4">
          {contacts.map(contact => (
            <div key={contact.id} className="p-4 bg-gray-100 rounded-md">
              <p><strong>Name:</strong> {contact.name || 'No Name'}</p>
              <p><strong>Phone:</strong> {contact.phone || 'No Phone'}</p>
              <p><strong>Email:</strong> {contact.email || 'No Email'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No contacts available.</p>
      )}
    </div>
  );
};

export default ContactList;
