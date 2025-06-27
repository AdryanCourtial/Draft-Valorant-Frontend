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
