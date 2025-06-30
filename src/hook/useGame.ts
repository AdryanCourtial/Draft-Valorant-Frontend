import { useEffect } from "react";
import { socket } from "../config/socket.config";
import { useAtom } from "jotai";
import { draftRoomAtom } from "../atoms/gameAtom";
import { createRoom, getRoom, isReady, joinRoom } from "../api/gameApi";
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

    socket.on("error", (error: string) => {
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
    joinRoom(roomId, userId, side);
  };

  const handleGetRoom = (roomId: string) => {
    getRoom(roomId);
  }

  const handleIsReady = (
    roomId: string,
    side: "attackers_side" | "defenders_side"
  ) => {
    isReady(roomId, side);
  }
  return { handleCreateRoom, handleGetRoom, handleJoinSide, handleIsReady, draftRoom };
};