// hooks/useAuth.ts
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { login, register } from "../api/auth";
import { useNavigate } from "react-router-dom";


export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleLogin = async (email: string, password: string) => {
    const userData = await login(email, password);
    console.log("User data from login:", userData);
    setUser(userData);
    console.log("User state after login:", user);

  };

  const handleRegister = async (email: string, username: string, password: string,) => {
    const userData = await register(email, username, password);
    console.log("User data from register:", userData);
    if (userData) {
      navigate("/login");
    }
  }

  const handleLogout = () => {
    setUser(null);
  };

  return { user, handleLogin, handleLogout, handleRegister };
};
