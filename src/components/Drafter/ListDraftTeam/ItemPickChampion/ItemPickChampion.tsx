import React, { useEffect, useState } from "react";
import './ItemPickChampion.css'
import type { Agent, SideTeam } from "drafter-valorant-types";
import { ConvertJsonTableToArray, FindFirstNullInArray } from "../../../../utils/utils";
import { useAtom } from "jotai";
import { curentSideToPlayAtom, draftRoomAtom } from "../../../../atoms/drafter";

interface Props {
    agent: Agent | null;
    type: SideTeam
    placement: number
}

const ItemPickChampion: React.FC<Props> = ({ agent, type, placement }) => {

    const [curentSideToPlay] = useAtom(curentSideToPlayAtom)
    const [draftRoom] = useAtom(draftRoomAtom)

    const [indexToDisplay, setIndexToDisplay] = useState<number | null>(null)

    const isPicked = agent ? true : false;

    const ReturnBackgroundGradiant = (): string => {
        const ColorGradient = ConvertJsonTableToArray(agent?.backgroundGradientColors)
        return `linear-gradient(90deg,#${ColorGradient[ColorGradient.length - 1]} 0%, #${ColorGradient[0]} 100%)`
    }

    useEffect(() => {

        console.log("JE SUIS L'INDEX DE DECISION")

        if (curentSideToPlay?.type === "pick") {
            const res = FindFirstNullInArray(draftRoom![type].agents)
            console.log(res)
            setIndexToDisplay(res)
        } else {
            setIndexToDisplay(null)
        }

    }, [curentSideToPlay])

    return (
        <div className={`container-item-pick-champion ${curentSideToPlay?.team === type && indexToDisplay === placement ? "animate-border-glow" : ""}`}
        style={{
            background: isPicked ? ReturnBackgroundGradiant() : 'transparent',
            scale: curentSideToPlay?.team === type && indexToDisplay === placement ? "1.2" : "1"
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