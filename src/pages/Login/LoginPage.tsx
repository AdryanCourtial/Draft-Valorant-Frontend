import { useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm/LoginForm";
import "./LoginPage.css"; 


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
    <div className="page-login">
      <LoginForm />
      <p>
        Pas encore de compte ?{" "}
        <a
          onClick={() => navigate("/register")}
        >
          Créez-en un
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
