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
        No account yet ?{" "}
        <a
          onClick={() => navigate("/register")}
        >
          Create one
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
