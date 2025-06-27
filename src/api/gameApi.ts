import { socket } from "../config/socket.config";

export const createRoom = (
  roomId: string,
  pseudo: string,
  isPrivate: boolean
) => {
  socket.emit("createRoom", { roomId, pseudo, isPrivate });
};
