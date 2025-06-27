import React from "react";
import './ListChooseCharactere.css'
import { useAtom } from "jotai";
import { listAgentsAtom } from "../../../../../atoms/drafter";
import ItemChooseCharactere from "./ItemChooseCharactere/ItemChooseCharactere";

const ListChooseCharactere: React.FC = () => {

    const [listAgents] = useAtom(listAgentsAtom)

    return (
        <div className="container-list-choose-charactere">
            {
                listAgents.map((agent) => (
                    <ItemChooseCharactere key={agent.uuid} agent={agent} />
                ))
            }
        </div>
    )
}

export default ListChooseCharactere