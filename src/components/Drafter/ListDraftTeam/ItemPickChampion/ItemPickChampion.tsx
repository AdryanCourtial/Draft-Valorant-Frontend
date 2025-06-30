import React from "react";
import './ItemPickChampion.css'
import type { Agent } from "drafter-valorant-types";
import { ConvertJsonTableToArray } from "../../../../utils/utils";

interface Props {
    agent: Agent | null;
}

const ItemPickChampion: React.FC<Props> = ({ agent }) => {

    const isPicked = agent ? true : false;

    const ReturnBackgroundGradiant = (): string => {
        const ColorGradient = ConvertJsonTableToArray(agent?.backgroundGradientColors)
        return `linear-gradient(90deg,#${ColorGradient[ColorGradient.length - 1]} 0%, #${ColorGradient[0]} 100%)`
    }

    return (
        <div className="container-item-pick-champion"
        style={{
            background: isPicked ? ReturnBackgroundGradiant() : 'transparent',
        }} >
            {
                isPicked ? (
                    <>
                    <div className="img-item-pick-champion-background" style={{
                        backgroundImage: `url(${agent?.background})`
                    }} />
                    <div className="img-item-pick-champion" style={{
                        backgroundImage: `url(${agent?.fullPortraitV2})`
                    }} />
                    </>
                ) : null
            }
        </div>
    )
}

export default ItemPickChampion