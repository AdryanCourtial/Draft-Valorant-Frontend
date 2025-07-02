import React from "react";
import './TimerPanel.css'
import { useAtom } from "jotai";
import { draftRoomAtom, timerAtom } from "../../../../atoms/drafter";


const TimerPanel: React.FC = () => {

    const [timer] = useAtom(timerAtom)
    const [draftRoom] = useAtom(draftRoomAtom)


    const TIMER_DURATION = 25

    return (
        <>
        {
            draftRoom?.state === "finished" ? (
                <p style={{
                    color: "var(--color-red-500)"
                }}> {`${draftRoom.attackers_side.winRate}% VS ${draftRoom.defenders_side.winRate}%`}</p>
            ) : 

        <div className="container-timer">
            <p> {timer || "0"} </p>
            <div className="timer-bar-fill" style={{ width: `${((timer ?? 0) * 100) / TIMER_DURATION}%` }} />
        </div>
        }
        </>
    )
}

export default TimerPanel