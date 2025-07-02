// hooks/useAuth.ts
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { login, logout, register } from "../api/auth";
import { useNavigate } from "react-router-dom";


export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleLogin = async (email: string, password: string) => {
    const userData = await login(email, password);
    setUser(userData);
  };

  const handleRegister = async (email: string, username: string, password: string,) => {
    const userData = await register(email, username, password);
    if (userData) {
      navigate("/login");
    }
  }

  const handleLogout = () => {
    logout()
    setUser(null);
  };

  return { user, handleLogin, handleLogout, handleRegister };
};
