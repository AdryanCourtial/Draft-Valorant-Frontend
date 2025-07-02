import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD:src/components/Draft/CreateRoom.tsx
import { useSocketDraft } from "../../hook/useGame";
import CreateRoomForm from "./Form/CreateRoomForm";
import { useAuth } from "../../hook/useAuth";
import Navbar from "../common/Navbar/Navbar";
=======
import { useSocketDraft } from "../../../hook/useGame";
import CreateRoomForm from "../Form/CreateRoomForm";
>>>>>>> origin/style/correction:src/components/Draft/CreateRoom/CreateRoom.tsx

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
<<<<<<< HEAD:src/components/Draft/CreateRoom.tsx
      <Navbar />
=======
>>>>>>> origin/style/correction:src/components/Draft/CreateRoom/CreateRoom.tsx
    </div>
  );
};

export default CreateRoom;
