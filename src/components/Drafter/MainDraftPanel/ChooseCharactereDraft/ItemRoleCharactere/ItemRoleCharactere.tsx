import React from "react";
import './ItemRoleCharactere.css'
import type { AgentRole } from "drafter-valorant-types";

interface Props {
    role: AgentRole
}

const ItemRoleCharactere: React.FC<Props> = ({ role }) => {

    return (
        <div className="container-item-role-charactere">
            <img src={role.displayIcon} alt="" />
        </div>
    )
}

export default ItemRoleCharactere