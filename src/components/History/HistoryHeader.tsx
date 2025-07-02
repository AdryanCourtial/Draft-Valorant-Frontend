
interface Props {
  mapId: number;
  state: string;
  createdAt: string;
}

const HistoryHeader: React.FC<Props> = ({ mapId, state, createdAt }) => {
  return (
    <div>
      <h1>Historique de la partie</h1>
      <p><strong>Map :</strong> {mapId}</p>
      <p><strong>État :</strong> {state}</p>
      <p><strong>Date :</strong> {new Date(createdAt).toLocaleString()}</p>
    </div>
  );
};

export default HistoryHeader;
