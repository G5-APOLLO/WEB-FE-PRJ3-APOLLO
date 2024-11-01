import { useQuery } from "@tanstack/react-query";
import { useGetclients } from "../services/getClients";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => useGetclients(),
  });
};
