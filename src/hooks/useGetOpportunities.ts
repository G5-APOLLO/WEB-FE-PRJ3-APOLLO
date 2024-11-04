import { useQuery } from "@tanstack/react-query";
import { getOpportunities } from "../services/getOpportunities.service";

export const useGetOpportunities = (clientId?: number) => {
  return useQuery({
    queryKey: ['opportunities', clientId],
    queryFn: () => getOpportunities(clientId),
    staleTime: 5 * 60 * 1000
  });
};