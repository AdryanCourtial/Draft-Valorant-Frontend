import React from "react";
import './MainDraftPanel.css'
import ChooseCharactereDraft from "./ChooseCharactereDraft/ChooseCharactereDraft";

const MainDraftPanel: React.FC = () => {

    return (
        <div className="container-main-draft-panel">
            <div className="container-map-selected">
                <p> Map Séléctionné </p>
                <img className="container-splash-map" src="https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/splash.png" alt="" />
            </div>
            <div className="container-timer">
                <p> 29 </p>
                <hr />
            </div>
            <ChooseCharactereDraft />
        </div>
    )
}

export default MainDraftPanel