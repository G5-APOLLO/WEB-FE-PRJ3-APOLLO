import { ListClientType } from "../types/ListClient.type";
import axios from "axios";
import { IOpportunity } from "../types/ListOpportunity.type";

const API_URL = "https://web-fe-prj3-api-apollo.onrender.com";

export const createClient = async (client: ListClientType) => {
  const response = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Error creating the client");
  }

  return response.json();
};

// Función para obtener un cliente específico por ID (NIT en este caso)
export const fetchClientById = async (id: number): Promise<ListClientType> => {
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error obtaining customer");
  }

  return response.json();
};

// Función para actualizar un cliente
export const updateClient = async (
  client: ListClientType
): Promise<ListClientType> => {
  const response = await fetch(`${API_URL}/clients/${client.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Error updating the client");
  }

  return response.json();
};

// Función para buscar un contacto por su nombre (insensible a mayúsculas/minúsculas)
export const fetchContactByName = async (
  name: string
): Promise<{ id: number; name: string } | null> => {
  try {
    // Realizamos una solicitud GET para obtener todos los clientes
    const response = await fetch(`${API_URL}/clients`);

    if (!response.ok) {
      throw new Error("Error fetching clients");
    }

    const clients = await response.json();

    // Convertimos el nombre proporcionado a minúsculas para la comparación
    const normalizedName = name.toLowerCase();

    // Buscamos el primer cliente cuyo nombre coincida (ignorando mayúsculas/minúsculas)
    const contact = clients.find(
      (client: { name: string }) => client.name.toLowerCase() === normalizedName
    );

    // Si encontramos el contacto, devolvemos su id y nombre, de lo contrario, devolvemos null
    return contact ? { id: contact.id, name: contact.name } : null;
  } catch (error) {
    console.error("Error fetching contact by name:", error);
    return null; // Devuelve `null` en caso de error
  }
};

export const fetchClients = async (): Promise<ListClientType[]> => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Customers could not be obtained");
  }
};


export const createOpportunity = async (
  opportunity: Omit<IOpportunity, "id">
): Promise<IOpportunity> => {
  try {
    const response = await axios.post(`${API_URL}/opportunities`, opportunity);
    return response.data;
  } catch (error) {
    console.error("Error creating opportunity:", error);
    throw new Error("Failed to create opportunity");
  }
};

export const fetchOpportunities = async (): Promise<
  { id: number; businessName: string }[]
> => {
  try {
    const response = await axios.get(`${API_URL}/opportunities`);
    // Mapea la respuesta para obtener solo el `id` y `businessName` de cada oportunidad
    return response.data.map(
      (opportunity: { id: number; businessName: string }) => ({
        id: opportunity.id,
        businessName: opportunity.businessName,
      })
    );
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    throw new Error("Could not fetch opportunities");
  }
};
