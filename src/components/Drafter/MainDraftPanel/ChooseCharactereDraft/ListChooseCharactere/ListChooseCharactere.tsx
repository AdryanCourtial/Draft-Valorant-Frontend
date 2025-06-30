import React from "react";
import './ListChooseCharactere.css'
import ItemChooseCharactere from "./ItemChooseCharactere/ItemChooseCharactere";
import type { Agent } from "drafter-valorant-types";

interface Props {
    listAgents: Agent[]
}

const ListChooseCharactere: React.FC<Props> = ({ listAgents }) => {

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