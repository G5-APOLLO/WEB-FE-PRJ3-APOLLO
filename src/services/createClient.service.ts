// services/clientService.ts
import { ListClientType } from '../types/ListClient.type';

const API_URL = 'https://web-fe-prj3-api-apollo.onrender.com';

export const createClient = async (client: ListClientType) => {
  const response = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error('Error al crear el cliente');
  }

  return response.json();
};

// Función para obtener un cliente específico por ID (NIT en este caso)
export const fetchClientById = async (id: number): Promise<ListClientType> => {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Error al obtener el cliente');
    }
  
    return response.json();
  };

// Función para actualizar un cliente
export const updateClient = async (client: ListClientType): Promise<ListClientType> => {
  const response = await fetch(`${API_URL}/clients/${client.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el cliente');
  }

  return response.json();
};

// Función para buscar un contacto por su nombre (insensible a mayúsculas/minúsculas)
export const fetchContactByName = async (name: string): Promise<{ id: number; name: string } | null> => {
  try {
    // Realizamos una solicitud GET para obtener todos los clientes
    const response = await fetch(`${API_URL}/clients`);

    if (!response.ok) {
      throw new Error('Error fetching clients');
    }

    const clients = await response.json();

    // Convertimos el nombre proporcionado a minúsculas para la comparación
    const normalizedName = name.toLowerCase();

    // Buscamos el primer cliente cuyo nombre coincida (ignorando mayúsculas/minúsculas)
    const contact = clients.find((client: { name: string }) => client.name.toLowerCase() === normalizedName);

    // Si encontramos el contacto, devolvemos su id y nombre, de lo contrario, devolvemos null
    return contact ? { id: contact.id, name: contact.name } : null;
  } catch (error) {
    console.error('Error fetching contact by name:', error);
    return null; // Devuelve `null` en caso de error
  }
};

