import React, { useEffect } from "react";
import './Drafter.css'
import { useAtom } from "jotai";
import { listAgentsAtom, listRolesAtom } from "../../atoms/drafter";
import { fetchAllAgents } from "../../api/agents";
import ListDraftTeam from "../../components/Drafter/ListDraftTeam/ListDraftTeam";
import MainDraftPanel from "../../components/Drafter/MainDraftPanel/MainDraftPanel";
import { fetchAllRoles } from "../../api/roles";
import ButtonConfirmAction from "../../components/Drafter/MainDraftPanel/ButtonConfirmAction/ButtonConfirmAction";
import ListBanTeam from "../../components/Drafter/ListBanTeam/ListBanTeam";

const Drafter: React.FC = () => {

    const [listAgents, setListAgents] = useAtom(listAgentsAtom)
    const [listRoles, setListRoles] = useAtom(listRolesAtom)


    useEffect(() => {


        Promise.all([ fetchAllAgents(), fetchAllRoles() ]).then(([agents, roles]) => {
            setListAgents(agents)
            setListRoles(roles)
        })

        
    }, [])
    
    useEffect(() => {
        console.log("List of agents updated:", listAgents);
        console.log("List of roles updated:", listRoles);

    }, [listAgents, listRoles])

    return (
        <main>
            <div className="container-drafter">
                <ListDraftTeam type="attackers"/>
                <MainDraftPanel /> 
                <ListDraftTeam type="defenders" />
            </div>
            <div className="container-drafter-b">
                <ListBanTeam type="attackers"/>
                <ButtonConfirmAction />
                <ListBanTeam type="defenders" />

            </div>
        </main>
    )
}

export default Drafter;