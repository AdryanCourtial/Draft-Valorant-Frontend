import React from "react";
import './ChooseCharactereDraft.css'
import ItemRoleCharactere from "./ItemRoleCharactere/ItemRoleCharactere";
import { listRolesAtom } from "../../../../atoms/drafter";
import { useAtom } from "jotai";
import ListChooseCharactere from "./ListChooseCharactere/ListChooseCharactere";

const ChooseCharactereDraft: React.FC = () => {

    const [listRoles] = useAtom(listRolesAtom);

    return (
        <div className="container-choose-character-draft">
            <div className="container-header-choose-character-draft">
                {
                    listRoles.map((role) => (
                        <ItemRoleCharactere key={role.uuid} role={role} />
                    ))
                }
                <div className="container-search-character">
                    <input type="text" maxLength={15} placeholder="Rechercher un agent"/>
                </div>
            </div>

            <div className="container-list-character-draft">
                <ListChooseCharactere />
            </div>
        </div>
    )
}

export default ChooseCharactereDraft