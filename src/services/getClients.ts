import { fetcher } from "./api";
import { ListClietnType } from "../types/ListClient.type";

export const useGetclients = async (): Promise<ListClietnType[]> => {
    return fetcher("/clients");
};
