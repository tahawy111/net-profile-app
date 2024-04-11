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
import { useEffect, useState } from "react";
import { useUser } from "../components/AuthContext";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Hourglass, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const Renew: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getUserData, userData, user } = useUser();
  const [isRenwed, setIsRenwed] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getUserData()
      .then(() => {})
      .finally(() => setIsLoading(false));
  }, []);
  const getServiceInfo = (text: string) => {
    const regex = /(\d+)\s*جيجا\s*(\d+)\s*ج/g;
    const match = regex.exec(text);

    const capacity = match ? match[1] : ""; // Capacity in gigabytes
    const price = match ? match[2] : ""; // Price in Egyptian pounds

    return {
      capacity,
      price,
    };
  };

  const accountNumber =
    parseInt(userData?.yourPersonalAccountInfo.account.split(" ")[0]!) || 0;

  const quota = Number(
    userData?.yourQuota.totalDownloadAvailableToYou.split(" ")[0]
  );

  const reNew = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/renew`,
        user
      );
      setIsRenwed(true);
      toast.success(res.data.msg);
    } catch (error: any) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg);
      }
      setIsRenwed(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>تجديد الاشتراك</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Brand />
        <IonContent>
          {isLoading ? (
            <div className={cn("w-full flex justify-center")}>
              <Hourglass className="animate-spin" />
            </div>
          ) : quota > 0 ? (
            <p className="text-center text-lg text-green-400">
              عزيزي العميل! باقتك تعمل بالفعل فلا حاجة لتجديدها
            </p>
          ) : (
            <>
              <div className="flex items-center flex-col text-xl">
                <p>الرصيد</p>
                {userData?.yourPersonalAccountInfo.account}
              </div>

              {accountNumber <
                Number(
                  getServiceInfo(userData?.serviceData.currentService!).price
                ) && (
                <p className="text-center text-red-600 bg-gray-200/20">
                  عفوا! ليس بإمكانك تجديد الباقة <br /> لانه ليس لديك الرصيد
                  الكافي
                </p>
              )}

              {accountNumber >=
                Number(
                  getServiceInfo(userData?.serviceData.currentService!).price
                ) &&
                quota <= 0 && (
                  <div className="flex justify-center mt-3">
                    <Button onClick={reNew} variant={"primary"}>
                      تجديد الباقة
                    </Button>
                  </div>
                )}
            </>
          )}
          {isRenwed && (
            <p className="text-center text-lg bg-green-600 text-white block m-4 rounded-xl">
              تم تجديد الباقة بنجاح ✔✔✔ انتظر دقيقة ⌚ وسيعمل الانترنت
            </p>
          )}
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default Renew;
