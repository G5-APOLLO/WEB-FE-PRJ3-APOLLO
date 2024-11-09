import { useQuery } from '@tanstack/react-query';
import { fetchTrackingActivities} from '../services/getTrackingActivities.service';

export const useGetTrackingActivities = (oportunidadId: number) => {
return useQuery({
    queryKey: ['trackingActivities', oportunidadId],
    queryFn: () => fetchTrackingActivities(oportunidadId),
  });
};