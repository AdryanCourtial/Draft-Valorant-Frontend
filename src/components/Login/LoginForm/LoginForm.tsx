import { useState } from "react";
import { useAuth } from "../../../hook/useAuth";
import "./LoginForm.css"

const LoginForm = () => {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await handleLogin(email, password);
    } catch (err) {
      console.error(err);
      alert("Error during login. Please try again.");
    }
  };

  return (
    <div className="container-form-login">
      <h2>Connection</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={submit}>Log in</button>
    </div>
  );
};

export default LoginForm;
