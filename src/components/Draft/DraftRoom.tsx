import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import { useSocketDraft } from "../../hook/useGame";
import { useEffect } from "react";

const DraftRoom = () => {
  const { draftRoom, handleJoinSide, handleGetRoom, handleIsReady } = useSocketDraft();
  const [infoUser] = useAtom(userAtom);

  useEffect(() => {
    if (draftRoom?.uuid) return;

    const urlUuid = window.location.pathname.split("/").pop();
    if (urlUuid) {
      handleGetRoom(urlUuid);
    }
  }, [draftRoom, handleGetRoom]);

  if (!draftRoom ) return <div>Room introuvable ou chargement...</div>;

  const isLeaderAttackers = draftRoom.attackers_side.team_leader === infoUser?.id;
  const isLeaderDefenders = draftRoom.defenders_side.team_leader === infoUser?.id;

  return (
    <div>
      <h1>
        {draftRoom.attackers_side.name} VS {draftRoom.defenders_side.name}
      </h1>

      <button
        onClick={() =>
          handleJoinSide(draftRoom.uuid, infoUser?.id ?? 0, "attackers_side")
        }
      >
        Rejoindre Attaquants
      </button>

      <button
        onClick={() =>
          handleJoinSide(draftRoom.uuid, infoUser?.id ?? 0, "defenders_side")
        }
      >
        Rejoindre Défenseurs
      </button>

      {isLeaderAttackers && !draftRoom.attackers_side.isReady && (
        <button
          onClick={() => handleIsReady(draftRoom.uuid, "attackers_side")}
        >
          Prêt côté Attaquants
        </button>
      )}

      {isLeaderDefenders && !draftRoom.defenders_side.isReady && (
        <button
          onClick={() => handleIsReady(draftRoom.uuid, "defenders_side")}
        >
          Prêt côté Défenseurs
        </button>
      )}

      <pre>{JSON.stringify(draftRoom, null, 2)}</pre>
    </div>
  );
};

export default DraftRoom;
