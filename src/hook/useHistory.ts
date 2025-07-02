import { useState, useEffect } from "react";
import { getHistory } from "../api/historyApi";

export const useHistory = (roomId: string) => {
  const [history, setHistory] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const data = await getHistory(roomId);
        setHistory(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de l'historique");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [roomId]);

  return { history, loading, error };
};
