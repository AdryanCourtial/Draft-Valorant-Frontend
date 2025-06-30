import React from "react";
import './ItemChooseCharactere.css'
import type { Agent } from "drafter-valorant-types";
import { useAtom } from "jotai";
import { agentHoveredAtom } from "../../../../../../atoms/drafter";

interface Props {
    agent: Agent
}

const ItemChooseCharactere: React.FC<Props> = ({ agent }) => {

    const [, setAgentHovered] = useAtom(agentHoveredAtom);

    const handleHoverAgent = () => {
        setAgentHovered(agent)
    }

    return (
        <div className="container-item-list-charactere" onClick={handleHoverAgent}>

            <img src={agent.displayIcon} alt="" />

            <div>
                { agent.displayName }
            </div>
        </div>
    )
}

export default ItemChooseCharactere