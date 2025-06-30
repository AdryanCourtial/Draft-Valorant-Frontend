import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import CreateRoom from "../../components/Draft/CreateRoom";

const DraftPage = () => {
  const [infoUser] = useAtom(userAtom);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenue sur la Draft Page {infoUser?.username}
      </h1>
      <p className="text-lg">This is the draft page content.</p>
      <CreateRoom />
    </div>
  );
};

export default DraftPage;
