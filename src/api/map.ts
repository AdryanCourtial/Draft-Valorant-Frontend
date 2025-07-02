import type { Map } from "drafter-valorant-types";
import axiosClient from "../config/axios";

export const fetchAllMaps = async (): Promise<Map[]> => {
    try {
        const res = await axiosClient.get(`/map`);
        return res.data
    } catch (err) {
        console.error(err);
        return [];
    }
};