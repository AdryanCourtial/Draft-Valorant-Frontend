import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import CreateRoom from "../../components/Draft/CreateRoom/CreateRoom";
import "./DraftPage.css";

const DraftPage = () => {
  const [infoUser] = useAtom(userAtom);

  return (
    <div className="page-draft">
      <div className="draft-container">
        <h1 className="draft-title">
          Welcome, {infoUser?.username} 👋
        </h1>
        <p className="draft-subtitle">
          Here you can create a new draft room and start your team selection.
        </p>

        <CreateRoom />
      </div>
    </div>
  );
};

export default DraftPage;
