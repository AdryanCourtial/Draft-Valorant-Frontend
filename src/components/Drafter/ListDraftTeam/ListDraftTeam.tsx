import React from "react";
import type { Agent } from "drafter-valorant-types";
import './ListDraftTeam.css'

interface Props {
    agent?: Agent;
    
}

const ListDraftTeam: React.FC<Props> = () => {

    return (
        <div className="container-list-draft-team">
        </div>
    )
}

export default ListDraftTeam