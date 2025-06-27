import { useSocketDraft } from "../../hook/useGame";
import CreateRoomForm from "./Form/CreateRoomForm";

const DraftRoom = () => {
  const { handleCreateRoom, draftRoom } = useSocketDraft();

  return (
    <div>
      <CreateRoomForm handleCreateRoom={handleCreateRoom} />
      {draftRoom && (
        <>
          <h2>Room créée ✅</h2>
          <pre>{JSON.stringify(draftRoom, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default DraftRoom;
