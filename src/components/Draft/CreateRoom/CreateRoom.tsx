import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketDraft } from "../../../hook/useGame";
import CreateRoomForm from "../Form/CreateRoomForm";
import Navbar from "../../common/Navbar/Navbar";

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
      <Navbar />
    </div>
  );
};

export default CreateRoom;