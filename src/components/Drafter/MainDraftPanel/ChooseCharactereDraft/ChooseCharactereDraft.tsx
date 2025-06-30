import React, { useMemo, useState } from "react";
import './ChooseCharactereDraft.css'
import ItemRoleCharactere from "./ItemRoleCharactere/ItemRoleCharactere";
import { listAgentsAtom, listRolesAtom } from "../../../../atoms/drafter";
import { useAtom } from "jotai";
import ListChooseCharactere from "./ListChooseCharactere/ListChooseCharactere";
import type { AgentRole } from "drafter-valorant-types";

const ChooseCharactereDraft: React.FC = () => {

    const [listRoles] = useAtom(listRolesAtom);
    const [listAgents] = useAtom(listAgentsAtom);


    const [search, setSearch] = useState('');
    const [roleChoosed, setRoleChoosed] = useState<AgentRole | null>(null);
    

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const filteredCharacters = useMemo(() => {

        if (!search.trim() && !roleChoosed) return listAgents;

        let temp = listAgents.filter(character =>
            character.displayName.toLowerCase().includes(search.toLowerCase())
        )

        if (roleChoosed) {
            temp = temp.filter((character) => character.roleId === roleChoosed?.id);
        }

        return temp
        

    }, [listAgents, roleChoosed, search]);

    return (
        <div className="container-choose-character-draft">
            <div className="container-header-choose-character-draft">
                {
                    listRoles.map((role) => (
                        <ItemRoleCharactere key={role.uuid} role={role} roleChoosed={roleChoosed} setRoleChoosed={setRoleChoosed}/>
                    ))
                }
                <div className="container-search-character">
                    <input value={search} onChange={handleChangeSearch} type="text" maxLength={15} placeholder="Rechercher un agent"/>
                </div>
            </div>

            <div className="container-list-character-draft">
                <ListChooseCharactere listAgents={filteredCharacters} />
            </div>
        </div>
    )
}

export default ChooseCharactereDraft