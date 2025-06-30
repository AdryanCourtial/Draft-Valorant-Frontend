import React from "react";
import './ListDraftTeam.css'
import { GenerateArray } from "../../../utils/utils";
import ItemPickChampion from "./ItemPickChampion/ItemPickChampion";
// import { useAtom } from "jotai";
// import { listAgentsAtom } from "../../../atoms/drafter";

interface Props {
    type: "attackers" | "defenders";
}

const ListDraftTeam: React.FC<Props> = ({ type }) => {

    // const [listAgent] = useAtom(listAgentsAtom)

    return (
        <div className="container-list-draft-team"
        style={{
            alignItems: type === "attackers" ? "flex-start" : "flex-end"
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