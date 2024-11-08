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
