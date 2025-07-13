import './ItemChooseCharactere.css'
import type { Agent } from "drafter-valorant-types";
import { useAtom } from "jotai";
import { agentHoveredAtom, listAgentsAlreadyPickedAtom, roleInRoomAtom } from "../../../../../../atoms/drafter";

interface Props {
    agent: Agent
}

const ItemChooseCharactere: React.FC<Props> = ({ agent }) => {

    const [agentHovered, setAgentHovered] = useAtom(agentHoveredAtom);
    const [listAgentsAlreadyPicked, ] = useAtom(listAgentsAlreadyPickedAtom)
    const [roleInRoom, ] = useAtom(roleInRoomAtom)



    const handleHoverAgent = () => {
        setAgentHovered(agent)
    }

    const isAlreadyPicked =  listAgentsAlreadyPicked.includes(agent.id)

    return (
        <div className="container-item-list-charactere" onClick={isAlreadyPicked || roleInRoom === "spectate"  ? undefined : handleHoverAgent}
        style={{
            opacity: isAlreadyPicked ? "0.2" : "1",
            backgroundColor: (agentHovered?.id ?? 0) === agent.id ? "var(--color-red-500)" : "transparent"
        }}>

            <img src={agent.displayIcon} alt="" />

            <div>
                { agent.displayName }
            </div>
        </div>
    )
}

export default ItemChooseCharactere