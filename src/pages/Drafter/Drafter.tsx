import React, { useEffect, useMemo, useState } from "react";
import './Drafter.css'
import { useAtom } from "jotai";
import { agentHoveredAtom, listAgentsAlreadyPickedAtom, listAgentsAtom, listRolesAtom } from "../../atoms/drafter";
import { fetchAllAgents } from "../../api/agents";
import ListDraftTeam from "../../components/Drafter/ListDraftTeam/ListDraftTeam";
import MainDraftPanel from "../../components/Drafter/MainDraftPanel/MainDraftPanel";
import { fetchAllRoles } from "../../api/roles";
import ButtonConfirmAction from "../../components/Drafter/MainDraftPanel/ButtonConfirmAction/ButtonConfirmAction";
import ListBanTeam from "../../components/Drafter/ListBanTeam/ListBanTeam";
import { useSocketDraft } from "../../hook/useGame";
import type { ButtonFrontState, Room } from "drafter-valorant-types";
import { socket } from "../../config/socket.config";
import { useBeforeUnload } from "react-router-dom";

const Drafter: React.FC = () => {

    const [, setListAgents] = useAtom(listAgentsAtom)
    const [, setListRoles] = useAtom(listRolesAtom)
    const [agentHovered, ] = useAtom(agentHoveredAtom)


    const [buttonState, setButtonState] = useState<ButtonFrontState>()

    const { handleCreateRoom, handleGetRoom,  draftRoom, isReady, nextRound, setDraftRoom} = useSocketDraft();

    useEffect(() => {

        Promise.all([ fetchAllAgents(), fetchAllRoles() ]).then(([agents, roles]) => {
            setListAgents(agents)
            setListRoles(roles)
        })

        if (draftRoom?.uuid) return;

        const urlUuid = window.location.pathname.split("/").pop();
            if (urlUuid) {
            handleGetRoom(urlUuid);
        }

    }, [])

    useBeforeUnload(() => {
        socket.emit('leaveAllRooms')
    })

    useMemo(() => {
        if (!draftRoom) return;

        if (draftRoom?.state === 'waiting') {
            setButtonState({
                action: () => isReady(draftRoom),
                title: "Commencer"
            })
        } else if (draftRoom.state === 'running') {
            setButtonState({
                action: () => nextRound(draftRoom, agentHovered),
                title: "Confirmer"
            })
        } else {
            setButtonState(undefined);
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
                <ButtonConfirmAction action={buttonState?.action} title={buttonState?.title} />
                <ListBanTeam type="defenders" />

            </div>
        </main>
    )
}

export default Drafter;