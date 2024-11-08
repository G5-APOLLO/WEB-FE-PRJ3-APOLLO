import { fetcher } from "./api.service";
import { ListClientType } from "../types/ListClient.type";

export const useGetclients = async (): Promise<ListClientType[]> => {
    return fetcher("/clients");
};
