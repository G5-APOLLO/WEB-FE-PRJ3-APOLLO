import { useQuery } from '@tanstack/react-query';
import { fetchClientById } from '../services/clientService';

export const useClientData = (clientId: number) => {
  return useQuery({
    queryKey: ['client', clientId],
    queryFn: () => fetchClientById(clientId),
    enabled: !!clientId, // solo se activa si clientId es válido
  });
};
