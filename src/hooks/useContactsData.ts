import { useEffect, useState } from 'react';
import { getContactsByIds, Contact } from '../services/associatedContactsService';

export const useContactsData = (contactIds: number[]) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      if (contactIds.length === 0) {
        setContacts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log("Fetching contacts for IDs:", contactIds);
        const contactsData = await getContactsByIds(contactIds);
        setContacts(contactsData);
        setIsError(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [contactIds]);

  return { contacts, isLoading, isError };
};
