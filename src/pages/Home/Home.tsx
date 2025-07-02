import React from "react";

import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../../hook/useAuth";
import Navbar from "../../components/common/Navbar/Navbar";

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
    <div className="container_home">
      <img src="/iconValorant.png" alt="" />
      {user ? (
        <div className="container-home-content">
          <h1>
            Hello <strong>{user.username}</strong>, Welcome to Valorant Drafter !
          </h1>
          <button onClick={handleCreateRoom}>Create Room</button>
        </div>
      ) : (
        <div className="container-home-content">
          <h1 className="container-home-content">
            Hello, Welcome to Valorant Drafter !
          </h1>
          <button onClick={handleLogin}>Connection</button>
        </div>
      )}
        <Navbar />
    </div>
  );
};

export default Home;
