import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InteractiveBackground from "./components/common/InteractiveBackground/InteractiveBackground";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import DraftPage from "./pages/Draft/DraftPage";
import { usePersistUser } from "./hook/useUser";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DraftRoom from "./components/Draft/DraftRoom";
import Drafter from "./pages/Drafter/Drafter";

function App() {
  useEffect(() => {
    document.body.classList.add("dark");
  });

  usePersistUser();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/draft/:id" element={<Drafter />} />

          <Route
            path="/create-room"
            element={
              <ProtectedRoute>
                <DraftPage />
              </ProtectedRoute>
              }
          />
          {/* <Route path="/draft/:id" element={<DraftRoom />} /> */}

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <InteractiveBackground />
    </>
  );
}

export default App;
