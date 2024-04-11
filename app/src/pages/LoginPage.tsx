import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import LoginForm from "../components/LoginForm";
import Layout from "../components/Layout";
import { useUser } from "../components/AuthContext";

const LoginPage: React.FC = () => {  
  const { user } = useUser();
  console.log(user);
  return (
    <Layout>
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>تسجيل الدخول</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">تسجيل الدخول</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="flex w-full items-center flex-col gap-2 mt-3">
          <img
            src="/elfath-logo.png"
            className="w-24 h-24 bg-white rounded-full border-2 border-[#ac0700]"
            alt=""
          />
          <h1 className="text-center text-2xl font-bold">مركز الفتح</h1>
        </div>
        <LoginForm />
      </IonContent>
    </IonPage>
    </Layout>
  );
};

export default LoginPage;
