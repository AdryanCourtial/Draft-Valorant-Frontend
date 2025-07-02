import type { Agent } from "drafter-valorant-types";
import { socket } from "../config/socket.config";

export const createRoom = (
  mapId: string,
  attackers: string,
  defenders: string,
  creatorId: number
) => {
  socket.emit("createRoom", {
    mapId,
    attackers,
    defenders,
    creatorId,
  });
};

export const joinRoom = (
  roomId: string,
  userId: number | undefined,
  side: "attackers_side" | "defenders_side"
) => {
  socket.emit("join-side", {
    roomId,
    userId,
    side,
  });
};

export const getRoom = (roomId: string) => {
  socket.emit("getRoom", roomId);
}

export const startDraft = (roomId: string) => {
  console.log("Starting draft for room:", roomId);
  socket.emit("test-is-ready", { roomId });
}

export const confirmRound = (roomId: string, agent: Agent) => {
  socket.emit("confirm-round", { roomId, agent });
}

// useSocketDraft.ts
export const isReady = (roomId: string, side: "attackers_side" | "defenders_side") => {
  socket.emit("setReady", { roomId, side });
};

export const mockRoom = () => {
  socket.emit("mockRoom");
}


export const endGame = (roomId: string) => {
  socket.emit("endGame", { roomId });
}