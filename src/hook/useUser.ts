import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import axiosClient from "../config/axios";

export const usePersistUser = () => {
  const setUser = useSetAtom(userAtom);

    useEffect(() => {
    const fetchUser = async () => {
      try {
          const res = await axiosClient.get("/user");
        if (res.data) {
          setUser(res.data);
        }
      } catch (error) {
        console.error("❌ Erreur lors de la récupération de l'utilisateur :", error);
        setUser(null); 
      }
    };

    fetchUser();
  }, [ setUser ]);
};
