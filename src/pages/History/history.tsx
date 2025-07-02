
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import Navbar from "../../components/common/Navbar/Navbar";

const HistoryPage = () => {

  const [infoUser] = useAtom(userAtom)
  const navigate = useNavigate()

  return (
    <div>
        {infoUser?.drafts?.map((draft) => (
          <button onClick={() => navigate(`/draft/history/${draft.uuid}`)}>
            Voir la partie du {new Date(draft.createdAt).toLocaleString()}
          </button>
        ))}
        <Navbar />
    </div>
  );
};

export default HistoryPage;
