import { useQuery } from '@tanstack/react-query';
import { fetchActividadesSeguimiento } from '../services/getActivitys.service';

export const useActividadesSeguimiento = (oportunidadId: number) => {
return useQuery({
    queryKey: ['actividadesSeguimiento', oportunidadId],
    queryFn: () => fetchActividadesSeguimiento(oportunidadId),
  });
};