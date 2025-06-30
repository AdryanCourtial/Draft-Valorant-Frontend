import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import { useSocketDraft } from "../../hook/useGame";
import { useEffect } from "react";

const DraftRoom = () => {
  const { draftRoom, handleJoinSide, handleGetRoom } = useSocketDraft();
  const [infoUser] = useAtom(userAtom);

  useEffect(() => {
    if (draftRoom?.uuid) return;

    const urlUuid = window.location.pathname.split("/").pop();
    if (urlUuid) {
      handleGetRoom(urlUuid);
    }
  }, [draftRoom, handleGetRoom]);

  if (!draftRoom) return <div>Room introuvable ou chargement...</div>;

  return (
    <div>
      <h1>
        {draftRoom.attackers_side.name} VS {draftRoom.defenders_side.name}
      </h1>

      <button
        onClick={() =>
          handleJoinSide(draftRoom.uuid, infoUser.id, "attackers_side")
        }
      >
        Rejoindre Attaquants
      </button>

      <button
        onClick={() =>
          handleJoinSide(draftRoom.uuid, infoUser.id, "defenders_side")
        }
      >
        Rejoindre Défenseurs
      </button>

      <pre>{JSON.stringify(draftRoom, null, 2)}</pre>
    </div>
  );
};

export default DraftRoom;
