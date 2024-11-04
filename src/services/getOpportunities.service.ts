import { fetcher } from "./api.service";
import {IOpportunity} from "../types/ListOpportunity.type";

export const getOpportunities = async (): Promise<IOpportunity[]> => {
    return fetcher("/opportunities");
};
