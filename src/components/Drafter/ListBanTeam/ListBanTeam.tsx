import React from "react";
import './ListBanTeam.css'
import { GenerateArray } from "../../../utils/utils";
import ItemBanChampion from "../ListDraftTeam/ItemBanChampion/ItemBanChampion";

interface Props {
    type: "attackers" | "defenders";
}

const ListBanTeam: React.FC<Props> = ({ type }) => {

    return (
        <div className="container-list-ban-team">
            {
                GenerateArray(2).map((_, index) => (
                    <ItemBanChampion key={index} />
                ))
            }
        </div>
    )
}

export default ListBanTeam