import type { Agent } from "drafter-valorant-types";
import axiosClient from "../config/axios"

export const fetchAllAgents = async (): Promise<Agent[]> => {
    const response = await axiosClient.get('/agent')

    if (response.status !== 200) {
        throw new Error(`Error fetching agents: ${response.statusText}`);
    }

    return response.data;
}