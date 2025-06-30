import { useEffect } from "react";
import { socket } from "../config/socket.config";
import { useAtom } from "jotai";
import { draftRoomAtom } from "../atoms/gameAtom";
import { createRoom } from "../api/gameApi";
import type { Room } from "drafter-valorant-types";

export const useSocketDraft = () => {
  const [draftRoom, setDraftRoom] = useAtom(draftRoomAtom);

  useEffect(() => {
    socket.on("room-created", (room: Room) => {
      console.log("✅ Room created :", room);
      setDraftRoom(room);
    });

    
    socket.on("room-updated", (room: Room) => {
      console.log("🔄 Room updated :", room);
      setDraftRoom(room);
    });

    socket.on("room-error", (error: string) => {
      console.error("❌ Room error :", error);
    });

    return () => {
      socket.off("room-created");
      socket.off("room-updated");
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

  const handleJoinSide = (
    roomId: string,
    userId: number,
    side: "attackers_side" | "defenders_side"
  ) => {
    socket.emit("join-side", { roomId, userId, side });
  };

  return { handleCreateRoom, handleJoinSide, draftRoom };
};