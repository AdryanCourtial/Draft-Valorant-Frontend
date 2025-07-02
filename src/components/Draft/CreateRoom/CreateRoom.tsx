import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketDraft } from "../../../hook/useGame";
import CreateRoomForm from "../Form/CreateRoomForm";

const CreateRoom = () => {
  const { handleCreateRoom, draftRoom,  } = useSocketDraft();
  const navigate = useNavigate();

  useEffect(() => {
    if (draftRoom?.uuid) {
      navigate(`/draft/${draftRoom.uuid}`);
    }
  }, [draftRoom, navigate]);

  return (
    <div>
      <CreateRoomForm handleCreateRoom={handleCreateRoom} />
    </div>
  );
};

export default CreateRoom;
