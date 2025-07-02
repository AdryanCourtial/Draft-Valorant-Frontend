
import { useParams } from "react-router-dom";
import { useHistory } from "../../hook/useHistory";
import HistoryHeader from "../../components/History/HistoryHeader";
import TeamBlock from "../../components/History/TeamBlock";

const HistoryPage = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { history, loading, error } = useHistory(uuid || "");

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!history) return <p>Aucun historique trouvé</p>;

  return (
    <div>
      <HistoryHeader
        mapId={history.mapSelected}
        state={history.state}
        createdAt={history.createdAt}
      />

      <div>
        <TeamBlock side={history.attackersSide} />
        <TeamBlock side={history.defendersSide} />
      </div>
    </div>
  );
};

export default HistoryPage;
