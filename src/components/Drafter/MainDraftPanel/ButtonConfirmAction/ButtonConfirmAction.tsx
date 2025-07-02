import React, { useEffect, useMemo, useState } from "react";
import './ButtonConfirmAction.css'
import { agentHoveredAtom, curentSideToPlayAtom, draftRoomAtom, roleInRoomAtom } from "../../../../atoms/drafter";
import { userAtom } from "../../../../atoms/userAtom";
import { useAtom } from "jotai";
import type { Agent, ButtonFrontState, Room } from "drafter-valorant-types";

interface Props {
    handleIsReady: (roomId: string, side: "attackers_side" | "defenders_side") => void
    confirmActon: (room: Room, agent: Agent | null, userId?: number) => void
}
const ButtonConfirmAction: React.FC<Props>= ({ handleIsReady, confirmActon }) => {

    const [agentHovered, ] = useAtom(agentHoveredAtom)
    const [infoUser] = useAtom(userAtom);
    const [roleInRoom, setRoleInRoom] = useAtom(roleInRoomAtom)
    const [draftRoom] = useAtom(draftRoomAtom)
    const [curentSideToPlay] = useAtom(curentSideToPlayAtom)


    const [button, setButton] = useState<ButtonFrontState>({
        action: undefined,
        title: "-------"
    })


    useEffect(() => {
        if (!draftRoom) return;

        if (draftRoom.state === "waiting") {

            if (roleInRoom === 'attackers_side') {

                if (draftRoom.attackers_side.isReady) {
                    setButton({
                        title: "Waiting",
                        action: undefined
                    })
                    return
                }

                setButton({
                    title: "Attackers Ready",
                    action: () => handleIsReady(draftRoom.uuid, "attackers_side"),
                })
                
            } else if (roleInRoom === "defenders_side") {

                if (draftRoom.defenders_side.isReady) {
                    setButton({
                        title: "Waiting",
                        action: undefined
                    })
                    return
                }

                setButton({
                    title: "Defenders Ready",
                    action: () => handleIsReady(draftRoom.uuid, "defenders_side"),
                })

            } else {
                setButton({
                    title: "Spectateur",
                    action: undefined
                })
            }
        }

        if (draftRoom.state === "running") {
            setButton({
                title: "Confirme",
                action: () => confirmActon(draftRoom, agentHovered, infoUser?.id)
            })
        }

        if (draftRoom.state ==="finished") {
            setButton({
                title: "------",
                action: undefined
            })
        }

    }, [draftRoom, agentHovered])

    const buttonStyle = (): React.CSSProperties => {

        const yourTurn = curentSideToPlay?.team === roleInRoom
        const stateRoomWaiting = draftRoom?.state === "waiting"

        const opacity = () => {
            if (stateRoomWaiting) return "1"
            if (yourTurn && !agentHovered) return "0.5"
            if (yourTurn && agentHovered) return "1"

            return "0"
        }

        return {
            opacity: opacity()
        }
    }
    

    return (
        <>
        { curentSideToPlay?.team === roleInRoom || draftRoom?.state === "waiting" ? (
            <div className="button-confirm-action" onClick={button.action} style={buttonStyle()}>
                <button> {button.title} </button>
            </div>
        ) : <p> WAITING </p>
        }
        </>
    )
}

export default ButtonConfirmAction