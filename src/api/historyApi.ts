import axiosClient from "../config/axios"

export const getHistory = async (roomId: string) => {
    try {
        const res = await axiosClient.get(`/history/${roomId}`);
        if (res.data) {
            return res.data;
        }
        
    } catch (error) {
        console.error("❌ Erreur lors de la récupération de l'historique :", error);
        throw error; 
    }
}