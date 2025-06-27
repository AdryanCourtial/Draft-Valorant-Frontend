import { useEffect } from "react";
import { socket } from "../config/socket.config";
import { useAtom } from "jotai";
import { draftRoomAtom } from "../atoms/gameAtoms";
import { createRoom } from "../api/gameApi";
import type { DraftRoom } from "../types/draft.interface";

export const useSocketDraft = () => {
  const [draftRoom, setDraftRoom] = useAtom(draftRoomAtom);

  useEffect(() => {
    socket.on("room-created", (room: DraftRoom) => {
      console.log("✅ Room created :", room);
      setDraftRoom(room);
    });

    socket.on("room-error", (error: string) => {
      console.error("❌ Room error :", error);
    });

    return () => {
      socket.off("room-created");
      socket.off("room-error");
    };
  }, [ setDraftRoom ]);

  const handleCreateRoom = (
    roomId: string,
    pseudo: string,
    isPrivate: boolean
  ) => {
    createRoom(roomId, pseudo, isPrivate);
  };

  return { handleCreateRoom, draftRoom };
};