import { useQuery } from "@tanstack/react-query";
import { useGetclients } from "../services/getClients.service";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => useGetclients(),
  });
};
