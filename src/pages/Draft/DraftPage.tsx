import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import CreateRoom from "../../components/Draft/CreateRoom";
import { useNavigate } from "react-router-dom";

const DraftPage = () => {
  const navigate = useNavigate();

  const [infoUser] = useAtom(userAtom);
  console.log("infoUser DraftPage", infoUser);
  return (
    <div>
      <h1 >
        Bienvenue sur la Draft Page {infoUser?.username}
      </h1>
      <p>This is the draft page content.</p>
      <CreateRoom />

      {infoUser?.drafts?.map((draft) => (
      <button onClick={() => navigate(`/history/${draft.uuid}`)}>
        Voir la partie du {new Date(draft.createdAt).toLocaleString()}
      </button>
    ))}

    </div>
  );
};

export default DraftPage;
