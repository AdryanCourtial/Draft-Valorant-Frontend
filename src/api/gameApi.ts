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
  userId: number,
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

// useSocketDraft.ts
export const isReady = (roomId: string, side: "attackers_side" | "defenders_side") => {
  socket.emit("setReady", { roomId, side });
};
