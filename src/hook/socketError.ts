import { useAtom } from "jotai";
import { socketError } from "../atoms/socket";
import { useEffect } from "react";
import { socket } from "../config/socket.config";

export const useSocketError = () => {
  const [errorSocket, setSocketError] = useAtom(socketError);

  useEffect(() => {
    // Écoute l'événement "error" (ou le nom que tu as choisi côté serveur)
    socket.on("error", (err: string) => {
      setSocketError(err);
    });

    // Nettoyage
    return () => {
      socket.off("error");
    };
  }, [setSocketError]);
    return { errorSocket };
}
