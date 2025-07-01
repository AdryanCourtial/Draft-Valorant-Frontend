import React, { useEffect, useMemo, useState } from "react";
import './Drafter.css'
import { useAtom } from "jotai";
import { agentHoveredAtom, listAgentsAlreadyPickedAtom, listAgentsAtom, listRolesAtom, togglePopinChooseSideAtom } from "../../atoms/drafter";
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

const Drafter: React.FC = () => {

    const [, setListAgents] = useAtom(listAgentsAtom)
    const [, setListRoles] = useAtom(listRolesAtom)
    const [agentHovered, ] = useAtom(agentHoveredAtom)
    const [infoUser] = useAtom(userAtom);
    const [togglePopinChooseSide, setTogglePopinChooseSide] = useAtom(togglePopinChooseSideAtom)



    const [buttonState, setButtonState] = useState<ButtonFrontState>()

    const { handleCreateRoom, handleGetRoom,  draftRoom, isReady, nextRound, setDraftRoom, handleIsReady, handleJoinSide} = useSocketDraft();

    useEffect(() => {

      if (!draftRoom)  {
        const urlUuid = window.location.pathname.split("/").pop();
        if (urlUuid) {
          handleGetRoom(urlUuid);
        }
      }
      
      Promise.all([ fetchAllAgents(), fetchAllRoles() ]).then(([agents, roles]) => {
          setListAgents(agents)
          setListRoles(roles)
      })

    }, [handleGetRoom])

    useBeforeUnload(() => {
        socket.emit('leaveAllRooms')
    })

    const isLeaderAttackers = draftRoom?.attackers_side.team_leader === infoUser?.id;
    const isLeagerDefenders = draftRoom?.defenders_side.team_leader === infoUser?.id;
    

    useMemo(() => {
        if (!draftRoom) return;

        if (draftRoom?.state === 'waiting') {
            setButtonState({
                action: () => handleIsReady(draftRoom.uuid, isLeaderAttackers ? "attackers_side" : "defenders_side"),
                title: isLeaderAttackers ? "Attackant Ready" : "Defenders Ready"
            })
        } else if (draftRoom.state === 'running') {
            setButtonState({
                action: () => nextRound(draftRoom, agentHovered),
                title: "Confirmer"
            })
        } else {
            setButtonState({
                action: () => { },
                title: "Waiting"
            })
        }
    }, [draftRoom, agentHovered])

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
                  !isLeagerDefenders && ! isLeaderAttackers ? (
                    <p> Spectate </p>
                  ) :  <ButtonConfirmAction action={buttonState?.action} title={buttonState?.title} />
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
