import { useState, useEffect } from "react";
import { useAuth } from "../../../hook/useAuth";
import type { CreateRoomFormProps, MapData } from "../../../types/createRoom";
import axiosClient from "../../../config/axios";

const CreateRoomForm = ({ handleCreateRoom }: CreateRoomFormProps) => {
  const [maps, setMaps] = useState<MapData[]>([]);
  const [selectedMap, setSelectedMap] = useState<string>("");
  const [attackers, setAttackers] = useState("");
  const [defenders, setDefenders] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const res = await axiosClient.get(`/map`);
        setMaps(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMaps();
  }, []);

  const submit = () => {
    if (!selectedMap || !attackers || !defenders || !user) {
      alert("Remplis tout et connecte-toi !");
      return;
    }

    handleCreateRoom(selectedMap, attackers, defenders, user.id);
  };

  return (
    <div>
      <h2>Créer une Room</h2>

      <label>Map :</label>
      <select
        value={selectedMap}
        onChange={(e) => setSelectedMap(e.target.value)}
      >
        <option value="">-- Choisir une map --</option>
        {maps.map((map) => (
          <option key={map.uuid} value={map.uuid}>
            {map.displayName}
          </option>
        ))}
      </select>

      <div>
        <label>Nom Attaquants :</label>
        <input
          value={attackers}
          onChange={(e) => setAttackers(e.target.value)}
        />
      </div>

      <div>
        <label>Nom Défenseurs :</label>
        <input
          value={defenders}
          onChange={(e) => setDefenders(e.target.value)}
        />
      </div>

      <button onClick={submit}>Créer la Room</button>
    </div>
  );
};

export default CreateRoomForm;
