import { useState, useEffect } from "react";
import { useAuth } from "../../../hook/useAuth";
import type { CreateRoomFormProps, MapData } from "../../../types/createRoom";
import { fetchAllMaps } from "../../../api/map";
import "./CreateRoomForm.css";

const CreateRoomForm = ({ handleCreateRoom }: CreateRoomFormProps) => {
  const [maps, setMaps] = useState<MapData[]>([]);
  const [selectedMap, setSelectedMap] = useState<string>("");
  const [attackers, setAttackers] = useState("");
  const [defenders, setDefenders] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchAllMaps().then(setMaps);
  }, []);

  const submit = () => {
    if (!selectedMap || !attackers || !defenders || !user) {
      alert("Please fill everything and log in!");
      return;
    }

    handleCreateRoom(selectedMap, attackers, defenders, user.id);
  };

  return (
    <div className="create-room-form">
      <h2>Create a new Room</h2>

      <label>Map:</label>
      <select
        value={selectedMap}
        onChange={(e) => setSelectedMap(e.target.value)}
      >
        <option value="">-- Select a map --</option>
        {maps.map((map) => (
          <option key={map.uuid} value={map.uuid}>
            {map.displayName}
          </option>
        ))}
      </select>

      <label>Attackers team name:</label>
      <input
        value={attackers}
        onChange={(e) => setAttackers(e.target.value)}
        placeholder="Attackers"
      />

      <label>Defenders team name:</label>
      <input
        value={defenders}
        onChange={(e) => setDefenders(e.target.value)}
        placeholder="Defenders"
      />

      <button onClick={submit}>Create Room</button>
    </div>
  );
};

export default CreateRoomForm;
