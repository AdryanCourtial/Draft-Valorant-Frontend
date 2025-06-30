import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import { useSocketDraft } from "../../hook/useGame";

const DraftRoom = () => {
  const { draftRoom, handleJoinSide } = useSocketDraft();
  const [infoUser] = useAtom(userAtom);

  if (!draftRoom) return <div>Room introuvable</div>;

  return (
    <div>
      <h1>{draftRoom.attackers_side.name} VS {draftRoom.defenders_side.name}</h1>

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
