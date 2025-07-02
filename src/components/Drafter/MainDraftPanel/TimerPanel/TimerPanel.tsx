import React from "react";
import './TimerPanel.css'
import { useAtom } from "jotai";
import { timerAtom } from "../../../../atoms/drafter";


const TimerPanel: React.FC = () => {

    const [timer] = useAtom(timerAtom)

    const TIMER_DURATION = 25

    return (
        <div className="container-timer">
            <p> {timer || "0"} </p>
            <div className="timer-bar-fill" style={{ width: `${((timer ?? 0) * 100) / TIMER_DURATION}%` }} />
        </div>
    )
}

export default TimerPanel