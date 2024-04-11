import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import Layout from "../components/Layout";
import Brand from "../components/Brand";
import { Button } from "../components/ui/button";
import { useUser } from "../components/AuthContext";
import toast from "react-hot-toast";

const LogoutPage: React.FC = () => {
  const { logout } = useUser();
  const handleLogout = () => {
    logout();
    toast.success("تم تسجيل الخروج بنجاح 😥😥")
  };
  return (
    <Layout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>تسجيل الخروج</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Brand />
        <IonContent>
          <div className="flex flex-col items-center gap-3">
            <p className="text-center">
              هل انت متأكد من انك تريد تسجيل الخروج؟😥
            </p>
            <Button onClick={handleLogout} variant={"rose"}>
              تسجيل الخروج
            </Button>
          </div>
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default LogoutPage;
