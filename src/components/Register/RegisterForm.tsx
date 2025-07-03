import { useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = () => {
  const { handleRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await handleRegister(email, username, password);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div className="container-form-register">
      <h2>Create an account</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={submit}>Create</button>
    </div>
  );
};

export default RegisterForm;
