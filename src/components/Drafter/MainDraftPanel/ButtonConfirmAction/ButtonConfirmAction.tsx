import React from "react";
import './ButtonConfirmAction.css'

interface Props {
    title?: string
    action?: () => void;
}
const ButtonConfirmAction: React.FC<Props>= ({ action, title }) => {

    return (
        <div className="button-confirm-action" onClick={action}>
            <button> {title} </button>
        </div>
    )
}

export default ButtonConfirmAction