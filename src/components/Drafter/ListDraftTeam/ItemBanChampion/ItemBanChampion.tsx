import React from "react";
import type { Agent } from "drafter-valorant-types";
import './ItemBanChampion.css'

interface Props {
    agent?: Agent;
}


const ItemBanChampion: React.FC<Props> = ({ agent }) => {

    const isPicked = agent ? true : false;
    
    return (
        <div className="container-item-ban-champion" style={{
            backgroundImage: isPicked ? `url(${agent?.displayIcon})` : "none"
        }} />
    )
}

export default ItemBanChampion