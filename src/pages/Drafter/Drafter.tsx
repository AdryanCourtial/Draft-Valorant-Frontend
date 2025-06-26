import React, { useEffect } from "react";
import './Drafter.css'
import { useAtom } from "jotai";
import { listAgentsAtom } from "../../atoms/drafter";
import { fetchAllAgents } from "../../api/agents";
import ListDraftTeam from "../../components/Drafter/ListDraftTeam/ListDraftTeam";
import MainDraftPanel from "../../components/Drafter/MainDraftPanel/MainDraftPanel";

const Drafter: React.FC = () => {

    const [listAgents, setListAgents] = useAtom(listAgentsAtom)

    useEffect(() => {

        fetchAllAgents().then((agents) => {
            setListAgents(agents)
        })
        
    }, [])
    
    useEffect(() => {
        console.log("List of agents updated:", listAgents);
    }, listAgents)

    return (
        <main>
            <ListDraftTeam />
            <MainDraftPanel /> 
            <ListDraftTeam />
        </main>
    )
}

export default Drafter;