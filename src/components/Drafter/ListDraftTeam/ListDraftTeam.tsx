import React from "react";
import './ListDraftTeam.css'
import { GenerateArray } from "../../../utils/utils";
import ItemPickChampion from "./ItemPickChampion/ItemPickChampion";

interface Props {
    type: "attackers" | "defenders";
}

const ListDraftTeam: React.FC<Props> = ({ type }) => {

    return (
        <div className="container-list-draft-team"
        style={{
            alignItems: type === "attackers" ? "right" : "left"
        }}>
            {
                GenerateArray(5).map((_, index) => (
                    <ItemPickChampion key={index} />
                ))
            }
        </div>
    )
}

export default ListDraftTeam