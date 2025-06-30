import { useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm";
import LoginContent from "../../components/Login/LoginContent";

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // ✅ Redirige direct vers /create-room si connecté
      navigate("/create-room");
    }
  }, [user, navigate]);

  return (
    <div className="login-page">{!user ? <LoginForm /> : <LoginContent />}</div>
  );
};

export default LoginPage;
