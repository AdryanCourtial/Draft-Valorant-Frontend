import React, { useEffect, useState } from "react";
import './MainDraftPanel.css'
import ChooseCharactereDraft from "./ChooseCharactereDraft/ChooseCharactereDraft";
import TimerPanel from "./TimerPanel/TimerPanel";
import { useAtom } from "jotai";
import { curentSideToPlayAtom, draftRoomAtom, listMapsAtom } from "../../../atoms/drafter";
import type { SideTeam } from "drafter-valorant-types";

const MainDraftPanel: React.FC = () => {

    const [draftRoom] = useAtom(draftRoomAtom)
    const [listMaps] = useAtom(listMapsAtom)
    const [curentSideToPlay] = useAtom(curentSideToPlayAtom)
    

    const [ mapUrl, setMapUrl ] = useState<string>("")

    useEffect(() => {
        if (!draftRoom || !listMaps.length) return;

        const map = listMaps.find((value) => value.id === parseInt(draftRoom.map_selected));
        if (map) {
            setMapUrl(map.splash);
        }
    }, [draftRoom, listMaps]);

    const choosedColorText = (side: SideTeam): React.CSSProperties => {
        const result = curentSideToPlay?.team === side 
        return {
            scale: result ? "1.05" : "1",
            color: result ? "var(--color-red-500)" : "white"
        }
    }

    return (
        
        <div className="container-main-draft-panel">
            <div className="container-flex-name">
                <p style={choosedColorText("attackers_side")}> {draftRoom?.attackers_side.name}</p>
                <div className="container-map-selected">
                    <p> Map Séléctionné </p>
                    <img className="container-splash-map" src={mapUrl} alt="" />
                </div>
                <p style={choosedColorText("defenders_side")}>{draftRoom?.defenders_side.name}</p>
            </div>
            <div className="container-timer">
                <TimerPanel />
            </div>
            <ChooseCharactereDraft />
        </div>
    )
}

export default MainDraftPanel