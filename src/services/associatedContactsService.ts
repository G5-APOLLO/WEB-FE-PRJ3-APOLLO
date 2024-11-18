import axios from 'axios';

const API_URL = 'https://web-fe-prj3-api-apollo.onrender.com';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

// Obtener un contacto por su ID
export const getContactById = async (id: number): Promise<Contact> => {
  try {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    console.log(`Response data for contact ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching contact with ID ${id}:`, error);
    throw error;
  }
};

// Obtener múltiples contactos por sus IDs
export const getContactsByIds = async (ids: number[]): Promise<Contact[]> => {
  try {
    const contactPromises = ids.map(async (id) => {
      const contact = await getContactById(id);
      return contact;
    });

    const contacts = await Promise.all(contactPromises);
    console.log("Contacts fetched:", contacts);
    return contacts;
  } catch (error) {
    console.error('Error fetching multiple contacts:', error);
    throw error;
  }
};
