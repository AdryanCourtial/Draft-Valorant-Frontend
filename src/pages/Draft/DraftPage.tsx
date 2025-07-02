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

    </div>
  );
};

export default DraftPage;
