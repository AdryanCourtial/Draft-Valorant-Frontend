import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InteractiveBackground from "./components/common/InteractiveBackground/InteractiveBackground";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import DraftPage from "./pages/Draft/DraftPage";
import { usePersistUser } from "./hook/useUser";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Drafter from "./pages/Drafter/Drafter";
import { ToastContainer } from "react-toastify";
import RegisterPage from "./pages/Register/RegisterPage";

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

          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
      <InteractiveBackground />
      <ToastContainer />
    </>
  );
}

export default App;
