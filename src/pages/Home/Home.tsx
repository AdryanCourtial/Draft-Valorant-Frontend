import React from "react";

import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../../hook/useAuth";

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate("/create-room");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Bienvenue sur Drafteur Valorant</h1>
      <p>Sélectionnez vos agents et commencez à drafter votre équipe !</p>

      {user ? (
        <div>
          <p>
            Connecté en tant que <strong>{user.username}</strong>
          </p>
          <button onClick={handleCreateRoom}>Créer une Room</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Se connecter</button>
      )}
    </div>
  );
};

export default Home;
