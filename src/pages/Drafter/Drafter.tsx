import React, { useEffect, useMemo } from "react";
import './Drafter.css'
import { useAtom } from "jotai";
import { curentSideToPlayAtom, listAgentsAtom, listMapsAtom, listRolesAtom, roleInRoomAtom, togglePopinChooseSideAtom } from "../../atoms/drafter";
import { fetchAllAgents } from "../../api/agents";
import ListDraftTeam from "../../components/Drafter/ListDraftTeam/ListDraftTeam";
import MainDraftPanel from "../../components/Drafter/MainDraftPanel/MainDraftPanel";
import { fetchAllRoles } from "../../api/roles";
import ButtonConfirmAction from "../../components/Drafter/MainDraftPanel/ButtonConfirmAction/ButtonConfirmAction";
import ListBanTeam from "../../components/Drafter/ListBanTeam/ListBanTeam";
import { useSocketDraft } from "../../hook/useGame";
import { socket } from "../../config/socket.config";
import { Link, useBeforeUnload } from "react-router-dom";
import { userAtom } from "../../atoms/userAtom";
import Popin from "../../components/Popin/Popin";
import ButtonChooseSide from "../../components/Drafter/ButtonChooseSide/ButtonChooseSide";
import { fetchAllMaps } from "../../api/map";
import Loader from "../../components/common/Loader/Loader";
import { getHistory } from "../../api/historyApi";

interface Props {
  isHistory?: boolean
}

const Drafter: React.FC<Props> = ({ isHistory }) => {

    const [, setListAgents] = useAtom(listAgentsAtom)
    const [, setListRoles] = useAtom(listRolesAtom)
    const [, setListMaps] = useAtom(listMapsAtom)
    const [infoUser] = useAtom(userAtom);
    const [togglePopinChooseSide, setTogglePopinChooseSide] = useAtom(togglePopinChooseSideAtom)
    const [_, setCurentSideToPlay] = useAtom(curentSideToPlayAtom)
    const [roleInRoom, setRoleInRoom] = useAtom(roleInRoomAtom)
    
    
    
    const { handleGetRoom,  draftRoom, nextRound, handleIsReady, handleJoinSide, setDraftRoom } = useSocketDraft();
    
    useEffect(() => {
      
      const urlUuid = window.location.pathname.split("/").pop();

      if (!draftRoom)  {
        if (urlUuid) {
          handleGetRoom(urlUuid);
        }
      }

      if (isHistory) {
        const draft = infoUser?.drafts?.find((value) => value.uuid === urlUuid)

        console.log("TENTATIVE DE FETCH LA ROOM : ", draft?.uuid)

        if (!draft) return
        
        getHistory(draft?.uuid).then((data) => {
          console.log(data)
          setDraftRoom(data)
        });

      }
      
      Promise.all([ fetchAllAgents(), fetchAllRoles(), fetchAllMaps() ]).then(([agents, roles, maps]) => {
          setListAgents(agents)
          setListRoles(roles)
          setListMaps(maps)
      })


    }, [])

    useEffect(() => {
      if (draftRoom) {
        if (draftRoom?.attackers_side.team_leader === infoUser?.id || draftRoom?.defenders_side.team_leader === infoUser?.id) {
          setTogglePopinChooseSide(false)
        }
      }
    }, [draftRoom])

    useBeforeUnload(() => {
        socket.emit('leaveAllRooms')
    })

    useMemo(() => {

      const curentTurn = draftRoom?.draft_session.draft_actions.find((value) => value.turn === draftRoom.draft_session.curent_turn)
      setCurentSideToPlay(curentTurn)

      if (draftRoom?.attackers_side.team_leader === infoUser?.id) {
        setRoleInRoom("attackers_side")
      } else if (draftRoom?.defenders_side.team_leader === infoUser?.id) {
        setRoleInRoom("defenders_side")
      } else {
        setRoleInRoom("spectate")
      }

    }, [draftRoom])
    

    return (
      <>
      { draftRoom ? (
        <>
        <main>
          <div className="container-drafter">

              <ListDraftTeam type="attackers_side" />
              <MainDraftPanel />
              <ListDraftTeam type="defenders_side" />

          </div>
          <div className="container-drafter-b">

              <ListBanTeam type="attackers" />
              {
                roleInRoom === "spectate" ? (
                  <p> Spectate </p>
                ) :  <ButtonConfirmAction confirmActon={nextRound} handleIsReady={handleIsReady} />
              }
              <ListBanTeam type="defenders" />

          </div>
          <Popin toggle={togglePopinChooseSide} >
            {
              draftRoom ? (
                <>
                <div className="container-popup">
                  <div className="container-popup-info">
                    <h1> Select a role : </h1>
                    {
                      !infoUser ? (
                        <p> You need to be <Link to={"/login"}>authentificated</Link> for join a side </p>
                      ) : <p> Login as : <strong>{infoUser.username}</strong></p>
                    }
                    
                  </div>
                  <div className="container-popup-button">
                    <ButtonChooseSide type="attackers_side" action={() => handleJoinSide(draftRoom?.uuid, infoUser?.id, "attackers_side")} />
                    <ButtonChooseSide type="spectate" action={() => setTogglePopinChooseSide(false)}/>
                    <ButtonChooseSide type="defenders_side" action={() => handleJoinSide(draftRoom?.uuid, infoUser?.id, "defenders_side")} />
                  </div>
                </div>
                </>
              ) : null
            }
          </Popin>
      </main>
        </>
        ) : <div className="container-loader-main">
            <Loader />
          </div>
      }
      </>
          
    )
}

export default Drafter;
