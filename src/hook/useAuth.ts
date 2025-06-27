// hooks/useAuth.ts
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { login } from "../api/auth";

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  const handleLogin = async (email: string, password: string) => {
    const userData = await login(email, password);
    console.log("User data from login:", userData);
    setUser(userData);
    console.log("User state after login:", user);

  };

  const handleLogout = () => {
    setUser(null);
  };

  return { user, handleLogin, handleLogout };
};
