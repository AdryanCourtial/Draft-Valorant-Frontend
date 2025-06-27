import type { AgentRole } from "drafter-valorant-types";
import axiosClient from "../config/axios"

export const fetchAllRoles = async (): Promise<AgentRole[]> => {
    const response = await axiosClient.get('/role')

    if (response.status !== 200) {
        throw new Error(`Error fetching roles: ${response.statusText}`);
    }

    return response.data;
}