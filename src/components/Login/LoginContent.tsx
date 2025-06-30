import { useAuth } from "../../hook/useAuth";

const LoginContent = () => {
  const { user, handleLogout } = useAuth();

  return (
    <div>
      <h2>✅ Connecté en tant que {user?.username}</h2>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default LoginContent;
