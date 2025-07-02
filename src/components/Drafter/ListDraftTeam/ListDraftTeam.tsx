import React from "react";
import './ListDraftTeam.css'
import ItemPickChampion from "./ItemPickChampion/ItemPickChampion";
import { useAtom } from "jotai";
import { draftRoomAtom } from "../../../atoms/drafter";
import type { SideTeam } from "drafter-valorant-types";

interface Props {
    type: SideTeam;
}

const ListDraftTeam: React.FC<Props> = ({ type }) => {

    const [draftRoom, _] = useAtom(draftRoomAtom);

    return (
        <div className="container-list-draft-team"
        style={{
            alignItems: type === "attackers_side" ? "flex-start" : "flex-end"
        }}>
            {
                draftRoom ? (

                    type === "attackers_side" ? (
                        draftRoom?.attackers_side.agents.map((value, index) => (
                            <ItemPickChampion key={index} agent={value} type={type} placement={index}/>
                        ))
                    ) : 
                        draftRoom?.defenders_side.agents.map((value, index) => (
                            <ItemPickChampion key={index} agent={value} type={type} placement={index} />
                        ))
                ) : null
            }
        </div>
    )
}

export default ListDraftTeam