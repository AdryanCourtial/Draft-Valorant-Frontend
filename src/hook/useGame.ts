import { useEffect } from "react";
import { socket } from "../config/socket.config";
import { useAtom } from "jotai";
import { draftRoomAtom } from "../atoms/gameAtom";
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
    mapId: string,
    attackers: string,
    defenders: string,
    creatorId: number
  ) => {
    createRoom(mapId, attackers, defenders, creatorId);
  };

  return { handleCreateRoom, draftRoom };
};