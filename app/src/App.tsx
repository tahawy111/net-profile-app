import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import LogoutPage from "./pages/LogoutPage";
import Profile from "./pages/Profile";
import Renew from "./pages/Renew";
import { AuthProvider, useUser } from "./components/AuthContext";
import AppRoutes from "./components/AppRoutes";

setupIonicReact();

// const PrivateRoute = ({
//   auth: { isAuthenticated },
//   children,
// }: {
//   auth: { isAuthenticated: boolean };
//   children: React.ReactNode;
// }) => {
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

const App: React.FC = () => {
  return (
    <IonApp>
      <Toaster toastOptions={{ duration: 4000 }} />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
