import { useEffect } from "react";
import { socket } from "../config/socket.config";
import { useAtom } from "jotai";
import { draftRoomAtom } from "../atoms/drafter";
import { confirmRound, createRoom, getRoom, joinRoom, startDraft } from "../api/gameApi";
import type { Agent, Room } from "drafter-valorant-types";

export const useSocketDraft = () => {
  const [draftRoom, setDraftRoom] = useAtom(draftRoomAtom);

  useEffect(() => {

    socket.emit('getRoom', { roomId: draftRoom?.uuid })

    socket.on("room-created", (room: Room) => {
      console.log("✅ Room created :", room);
      setDraftRoom(room);
    });

    socket.on("room-updated", (room: Room) => {
      console.log("🔄 Room updated :", room);
      setDraftRoom(room);
    });

    socket.on("start-draft", (room: Room) => {
      console.log("🔄 Début de la draft", room);
      setDraftRoom(room);
    });

    socket.on("agent-picked", (room: Room) => {
      console.log("🔄 Round Acutalisé pour tous", room);
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
  }, []);

  /** FONCTION POUR POUR LES EMITS */

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

  const isReady = (room: Room) => {
    console.log("isReady called with room:", room);
    startDraft(room.uuid);
  }

  const nextRound = (room: Room, agent: Agent | null) => {

    console.log(agent)
    
    if (!agent) {
      console.error("Agent is required to confirm the round.");
      return;
    }
    
    console.log("Confirm round Round for", room);
    confirmRound(room.uuid, agent);
  }

  const handleGetRoom = (roomId: string) => {
    getRoom(roomId);
  }

  return { handleCreateRoom, handleGetRoom, handleJoinSide, draftRoom, isReady, nextRound , setDraftRoom};
};