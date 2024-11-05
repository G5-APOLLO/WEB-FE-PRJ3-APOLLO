export const fetchClientById = async (clientId: number) => {
    const response = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/clients/${clientId}`);
    if (!response.ok) {
      throw new Error('Error al cargar la información del cliente');
    }
    return response.json();
  };
  