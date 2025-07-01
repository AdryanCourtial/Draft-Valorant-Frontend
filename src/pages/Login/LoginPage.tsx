import { useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm";

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
    <div className="login-page">
      <LoginForm />
      <p className="mt-4 text-center">
        Pas encore de compte ?{" "}
        <a
          onClick={() => navigate("/register")}
          className="text-blue-500 underline"
        >
          Créez-en un
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
