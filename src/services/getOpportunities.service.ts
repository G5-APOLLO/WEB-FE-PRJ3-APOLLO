import { fetcher } from "./api.service";
import {IOpportunity} from "../types/ListOpportunity.type";

export const getOpportunities = async (clientId?: number): Promise<IOpportunity[]> => {
    const data = await fetcher("/opportunities");
    return clientId ? data.filter((opportunity: IOpportunity) => opportunity.clientIds.includes(clientId)) : data;
};
