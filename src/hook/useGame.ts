import { useEffect } from "react";
import { socket } from "../config/socket.config";
import { useAtom } from "jotai";
import { agentHoveredAtom, draftRoomAtom, listAgentsAlreadyPickedAtom, timerAtom, togglePopinChooseSideAtom } from "../atoms/drafter";
import { confirmRound, createRoom, getRoom, joinRoom, startDraft, isReady, endGame, mockRoom } from "../api/gameApi";
import type { Agent, Room, SocketError } from "drafter-valorant-types";
import { toast } from "react-toastify";
import { ArrayOfChampRegistered } from "../utils/utils";
import { userAtom } from "../atoms/userAtom";

export const useSocketDraft = () => {
  const [draftRoom, setDraftRoom] = useAtom(draftRoomAtom);
  const [timer, setTimer] = useAtom(timerAtom)
  const [, setListAgentsAlreadyPicked] = useAtom(listAgentsAlreadyPickedAtom)
  const [, setTogglePopinChooseSide] = useAtom(togglePopinChooseSideAtom)
  const [infoUser] = useAtom(userAtom);
  const [, setAgentHovered] = useAtom(agentHoveredAtom)
  

  useEffect(() => {
    console.log(draftRoom?.uuid)
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

    socket.on("timer-update", (timeLeft: number) => {
      console.log(timeLeft)
      setTimer(timeLeft)
    })

    socket.on("agent-picked", (room: Room) => {
      console.log("🔄 Round Acutalisé pour tous", room);
      setDraftRoom(room);

      let array_id: number[] = []

      ArrayOfChampRegistered(room).forEach((value) => {
          if (value) {
              array_id.push(value.id)
          }
      })

      setListAgentsAlreadyPicked(array_id)
    });

    socket.on("room-error", (error: SocketError) => {
      console.error("❌ Room error :", error);
      toast(error.message);
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
    userId: number | undefined,
    side: "attackers_side" | "defenders_side"
  ) => {
    if (!infoUser) return toast("Vous devez être connecté pour rejoindre un side")
    joinRoom(roomId, userId, side);
    setTogglePopinChooseSide(false)
  };

  // const isReady = (room: Room) => {
  //   console.log("isReady called with room:", room);
  //   startDraft(room.uuid);
  // }

  const nextRound = (room: Room, agent: Agent | null, userId?: number) => {

    if (!agent) {
      console.error("Agent is required to confirm the round.");
      return;
    }
    
    confirmRound(room.uuid, agent, userId);
    
    setAgentHovered(null)

  }

  const handleGetRoom = (roomId: string) => {
    getRoom(roomId);
  }

  const handleIsReady = (
    roomId: string,
    side: "attackers_side" | "defenders_side"
  ) => {
    isReady(roomId, side);
  }

  const handleEndGame = (roomId: string) => {
    endGame(roomId);
  }
  
  return { handleCreateRoom, handleGetRoom, handleJoinSide, handleIsReady, handleEndGame, draftRoom, nextRound };
};