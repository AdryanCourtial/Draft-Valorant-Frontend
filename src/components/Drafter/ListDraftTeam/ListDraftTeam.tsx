import React from "react";
import './ListDraftTeam.css'
import ItemPickChampion from "./ItemPickChampion/ItemPickChampion";
import { useAtom } from "jotai";
import { draftRoomAtom } from "../../../atoms/drafter";

interface Props {
    type: "attackers" | "defenders";
}

const ListDraftTeam: React.FC<Props> = ({ type }) => {

    // const [listAgent] = useAtom(listAgentsAtom)

    const [draftRoom, _] = useAtom(draftRoomAtom);

    return (
        <div className="container-list-draft-team"
        style={{
            alignItems: type === "attackers" ? "flex-start" : "flex-end"
        }}>
            {
                draftRoom ? (

                    type === "attackers" ? (
                        draftRoom?.attackers_side.agents.map((value, index) => (
                            <ItemPickChampion key={index} agent={value} />
                        ))
                    ) : 
                        draftRoom?.defenders_side.agents.map((value, index) => (
                            <ItemPickChampion key={index} agent={value} />
                        ))
                ) : null
            }
        </div>
    )
}

export default ListDraftTeam