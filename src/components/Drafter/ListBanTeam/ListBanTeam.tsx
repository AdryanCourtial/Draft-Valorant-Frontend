import React from "react";
import './ListBanTeam.css'
import ItemBanChampion from "../ListDraftTeam/ItemBanChampion/ItemBanChampion";
import { useAtom } from "jotai";
import { draftRoomAtom } from "../../../atoms/drafter";

interface Props {
    type: "attackers" | "defenders";
}

const ListBanTeam: React.FC<Props> = ({ type }) => {

    const [draftRoom, _] = useAtom(draftRoomAtom);
    
    return (
        <div className="container-list-ban-team">
            {
                type === "attackers" ? (
                    draftRoom?.attackers_side.bans.map((value, index) => (
                        <ItemBanChampion key={index} agent={value} />
                    ))
                ) : 
                    draftRoom?.defenders_side.bans.map((value, index) => (
                        <ItemBanChampion key={index} agent={value} />
                    ))
            }
        </div>
    )
}

export default ListBanTeam