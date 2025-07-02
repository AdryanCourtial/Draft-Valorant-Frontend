import type { SideTeam } from "drafter-valorant-types";
import "./ButtonChooseSide.css"
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../../atoms/userAtom";
import { draftRoomAtom } from "../../../atoms/drafter";

interface Props {
    action: () => void
    type?: SideTeam | "spectate"
}

const ButtonChooseSide: React.FC <Props>= ({ action, type }) => {
    const [infoUser] = useAtom(userAtom);
    const [draftRoom] = useAtom(draftRoomAtom);

    const [title, setTitle] = useState<string>("")

    useEffect(() => {
        let titleResult: string = "Spectate"

        if (type === "attackers_side") {
            titleResult = "Attackers Side"
        }

        if (type === "defenders_side") {
            titleResult = "Defenders Side"
        }

        setTitle(titleResult)
    }, [])

    const sideIsTaken = (side?: SideTeam | "spectate"): boolean => {

        if (side === "spectate" || !side) return false

        return !!draftRoom![side].team_leader || draftRoom![side].team_leader !== 0
    }

    const styleChoosed = (): React.CSSProperties => {
        const needToBeConnected = ["attackers_side", "defenders_side"].includes(type || "") && !infoUser
        return {
            borderColor: type === "attackers_side" ? "var(--color-red-500)" : type === "defenders_side" ? "var(--color-blue-500)" : "",
            opacity:  needToBeConnected || sideIsTaken(type) ? "0.4" : "1",
            cursor: needToBeConnected || sideIsTaken(type) ? "not-allowed" : ""
        }
    }

    return (
        <button onClick={!infoUser || sideIsTaken(type) ? undefined : action} style={styleChoosed()} >
            {title}
        </button>
    );
};

export default ButtonChooseSide;