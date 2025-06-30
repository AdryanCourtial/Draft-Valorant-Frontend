import React from "react";
import './ItemRoleCharactere.css'
import type { AgentRole } from "drafter-valorant-types";

interface Props {
    role: AgentRole
    roleChoosed?: AgentRole | null
    setRoleChoosed: (role: AgentRole | null) => void
}

const ItemRoleCharactere: React.FC<Props> = ({ role, roleChoosed, setRoleChoosed }) => {

    const handleChangeRole = () => {

        if (role.id === roleChoosed?.id) return setRoleChoosed(null)

        setRoleChoosed(role)
    }

    return (
        <div className="container-item-role-charactere"
        style={{
            backgroundColor: roleChoosed?.id === role.id ? "var(--color-red-500)" : "transparent"
        }} onClick={handleChangeRole}>
            <img src={role.displayIcon} alt="" />
        </div>
    )
}

export default ItemRoleCharactere