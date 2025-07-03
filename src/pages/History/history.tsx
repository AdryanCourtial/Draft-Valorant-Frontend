
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import Navbar from "../../components/common/Navbar/Navbar";
import "./History.css";

const HistoryPage = () => {
  const [infoUser] = useAtom(userAtom);
  const navigate = useNavigate();

  return (
    <div className="page-history">
      <h1>Your Drafts History</h1>

      {infoUser?.drafts && infoUser.drafts.length > 0 ? (
        <div className="history-list">
          {infoUser.drafts.map((draft) => (
            <button
              key={draft.uuid}
              className="history-item"
              onClick={() => navigate(`/draft/history/${draft.uuid}`)}
            >
              See match from {new Date(draft.createdAt).toLocaleString()}
            </button>
          ))}
        </div>
      ) : (
        <p className="no-history">You don’t have any drafts yet.</p>
      )}

      <Navbar />
    </div>
  );
};

export default HistoryPage;