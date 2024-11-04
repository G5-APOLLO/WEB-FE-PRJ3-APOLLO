import { useQuery } from "@tanstack/react-query";
import { getOpportunities } from "../services/getOpportunities.service";

export const useGetOpportunities = () => {
  return useQuery({
    queryKey: ["opportunities"],
    queryFn: () => getOpportunities(),
  });
};
