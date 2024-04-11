import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./AuthContext";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import Profile from "../pages/Profile";
import Renew from "../pages/Renew";

const AppRoutes = () => {
  const { user } = useUser();

  return (
    <Routes>
      {/* Redirect to profile if user is logged in, otherwise Redirect to login */}
      <Route path="/" element={user ? <Navigate to={`/profile`} /> : <Navigate to={`/login`} />} />

      {/* Redirect to profile if user is logged in, otherwise render LoginPage */}
      <Route path="/login" element={user ? <Navigate to="/profile" /> : <LoginPage />} />
      
      {/* Redirect to login if user is not logged in, otherwise render LogoutPage */}
      <Route path="/logout" element={user ? <LogoutPage /> : <Navigate to="/login" />} />

      {/* Render Profile if user is logged in, otherwise redirect to login */}
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

      {/* Render Renew if user is logged in, otherwise redirect to login */}
      <Route path="/renew" element={user ? <Renew /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
