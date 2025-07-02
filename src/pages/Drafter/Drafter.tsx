import React, { useEffect, useMemo, useState } from "react";
import './Drafter.css'
import { useAtom } from "jotai";
import { agentHoveredAtom, curentSideToPlayAtom, listAgentsAtom, listMapsAtom, listRolesAtom, roleInRoomAtom, togglePopinChooseSideAtom } from "../../atoms/drafter";
import { fetchAllAgents } from "../../api/agents";
import ListDraftTeam from "../../components/Drafter/ListDraftTeam/ListDraftTeam";
import MainDraftPanel from "../../components/Drafter/MainDraftPanel/MainDraftPanel";
import { fetchAllRoles } from "../../api/roles";
import ButtonConfirmAction from "../../components/Drafter/MainDraftPanel/ButtonConfirmAction/ButtonConfirmAction";
import ListBanTeam from "../../components/Drafter/ListBanTeam/ListBanTeam";
import { useSocketDraft } from "../../hook/useGame";
import type { ButtonFrontState } from "drafter-valorant-types";
import { socket } from "../../config/socket.config";
import { useBeforeUnload } from "react-router-dom";
import { userAtom } from "../../atoms/userAtom";
import Popin from "../../components/Popin/Popin";
import ButtonChooseSide from "../../components/Drafter/ButtonChooseSide/ButtonChooseSide";
import { fetchAllMaps } from "../../api/map";

const Drafter: React.FC = () => {

    const [, setListAgents] = useAtom(listAgentsAtom)
    const [, setListRoles] = useAtom(listRolesAtom)
    const [, setListMaps] = useAtom(listMapsAtom)
    const [agentHovered, ] = useAtom(agentHoveredAtom)
    const [infoUser] = useAtom(userAtom);
    const [togglePopinChooseSide, setTogglePopinChooseSide] = useAtom(togglePopinChooseSideAtom)
    const [_, setCurentSideToPlay] = useAtom(curentSideToPlayAtom)
    const [roleInRoom, setRoleInRoom] = useAtom(roleInRoomAtom)


    const [buttonState, setButtonState] = useState<ButtonFrontState>()

    const { handleGetRoom,  draftRoom, nextRound, handleIsReady, handleJoinSide} = useSocketDraft();

    useEffect(() => {

      if (!draftRoom)  {
        const urlUuid = window.location.pathname.split("/").pop();
        if (urlUuid) {
          handleGetRoom(urlUuid);
        }
      }
      
      Promise.all([ fetchAllAgents(), fetchAllRoles(), fetchAllMaps() ]).then(([agents, roles, maps]) => {
          setListAgents(agents)
          setListRoles(roles)
          setListMaps(maps)
      })

    }, [])

    useBeforeUnload(() => {
        socket.emit('leaveAllRooms')
    })

    useMemo(() => {

      const curentTurn = draftRoom?.draft_session.draft_actions.find((value) => value.turn === draftRoom.draft_session.curent_turn)
      setCurentSideToPlay(curentTurn?.team)

      if (draftRoom?.attackers_side.team_leader === infoUser?.id) {
        setRoleInRoom("attackers_side")
      } else if (draftRoom?.defenders_side.team_leader === infoUser?.id) {
        setRoleInRoom("defenders_side")
      } else {
        setRoleInRoom("spectate")
      }

    }, [draftRoom])
    

    return (
        <main>
            <div className="container-drafter">

                <ListDraftTeam type="attackers" />
                <MainDraftPanel />
                <ListDraftTeam type="defenders" />

            </div>
            <div className="container-drafter-b">

                <ListBanTeam type="attackers" />
                {
                  roleInRoom === "spectate" ? (
                    <p> Spectate </p>
                  ) :  <ButtonConfirmAction confirmActon={nextRound} handleIsReady={handleIsReady} />
                }
                <ListBanTeam type="defenders" />

            </div>
            <Popin toggle={togglePopinChooseSide} >
              {
                draftRoom ? (
                  <>
                    <ButtonChooseSide title="Attackers Side" action={() => handleJoinSide(draftRoom?.uuid, infoUser?.id, "attackers_side")} />
                    <ButtonChooseSide title="Spectate" action={() => setTogglePopinChooseSide(false)}/>
                    <ButtonChooseSide title="Defenders Side" action={() => handleJoinSide(draftRoom?.uuid, infoUser?.id, "defenders_side")} />
                  </>
                ) : null
              }
            </Popin>
        </main>
    )
}

export default Drafter;
