import { useSocketDraft } from "../../hook/useGame";

const DraftRoom = () => {
  const { handleCreateRoom, draftRoom } = useSocketDraft();

  const createRoomHandler = () => {
    handleCreateRoom("my-room-123", "Phoenix", false);
  };

  return (
    <div>
      <button onClick={createRoomHandler}>Créer une Room</button>
      {draftRoom && <pre>{JSON.stringify(draftRoom, null, 2)}</pre>}
    </div>
  );
};

export default DraftRoom;
