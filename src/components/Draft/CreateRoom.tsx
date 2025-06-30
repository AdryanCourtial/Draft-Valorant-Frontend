import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketDraft } from "../../hook/useGame";
import CreateRoomForm from "./Form/CreateRoomForm";

const CreateRoom = () => {
  const { handleCreateRoom, draftRoom } = useSocketDraft();
  const navigate = useNavigate();

  useEffect(() => {
    if (draftRoom?.uuid) {
      navigate(`/draft/${draftRoom.uuid}`);
    }
  }, [draftRoom, navigate]);

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

export default CreateRoom;
