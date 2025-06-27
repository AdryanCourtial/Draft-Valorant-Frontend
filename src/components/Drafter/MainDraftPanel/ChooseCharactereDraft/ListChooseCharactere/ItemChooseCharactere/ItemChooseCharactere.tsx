import React from "react";
import './ItemChooseCharactere.css'
import type { Agent } from "drafter-valorant-types";

interface Props {
    agent: Agent
}

const ItemChooseCharactere: React.FC<Props> = ({ agent }) => {

    return (
        <div className="container-item-list-charactere">

            <img src={agent.displayIcon} alt="" />

            <div>
                { agent.displayName }
            </div>
        </div>
    )
}

export default ItemChooseCharactere