import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketDraft } from "../../hook/useGame";
import CreateRoomForm from "./Form/CreateRoomForm";
import { useAuth } from "../../hook/useAuth";

const CreateRoom = () => {
  const { handleCreateRoom, draftRoom,  } = useSocketDraft();
  const {handleLogout } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (draftRoom?.uuid) {
      navigate(`/draft/${draftRoom.uuid}`);
    }
  }, [draftRoom, navigate]);

  return (
    <div>
      <CreateRoomForm handleCreateRoom={handleCreateRoom} />
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
};

export default CreateRoom;
