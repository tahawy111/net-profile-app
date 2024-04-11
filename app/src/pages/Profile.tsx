import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import Layout from "../components/Layout";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { useEffect, useState } from "react";
import { useUser } from "../components/AuthContext";
import { Button } from "../components/ui/button";
import { Hourglass, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import Brand from "../components/Brand";
import Icons from "../components/Icons";

const Profile: React.FC = () => {
  const { getUserData, userData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getUserData()
      .then(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const refetch = async () => {
    try {
      setIsLoading(true);
      await getUserData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>الملف الشخصي</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Brand />

        <IonContent>
          <div className="dark:text-gray-50 mb-16">
            <div className="w-full flex justify-center mt-3 mb-1">
              <Button onClick={refetch} className="" variant={"rose"}>
                إعادة التحميل
              </Button>
            </div>

            <div
              className={cn(
                "w-full flex justify-center",
                isLoading ? "visible" : "invisible"
              )}
            >
              <Hourglass className="animate-spin" />
            </div>

            <div className="container mx-auto pt-3 px-4 md:px-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات حسابك الشخصى</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>اسم المستخدم</Label>
                      <p>{userData?.yourPersonalAccountInfo.username}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label>حالة الاشتراك</Label>
                      {userData?.yourPersonalAccountInfo.subscriptionState.trim() ===
                      "اشتراكك نشط" ? (
                        <p className="text-green-500">
                          {userData?.yourPersonalAccountInfo.subscriptionState.trim()}
                        </p>
                      ) : userData?.yourPersonalAccountInfo.subscriptionState.trim() ===
                        "انتهت فترة اشتراكك" ? (
                        <p className="text-yellow-500">
                          {userData?.yourPersonalAccountInfo.subscriptionState.trim()}
                        </p>
                      ) : userData?.yourPersonalAccountInfo.subscriptionState.trim() ===
                        "اشتراك موقوف" ? (
                        <p className="text-red-500">
                          {userData?.yourPersonalAccountInfo.subscriptionState.trim()}
                        </p>
                      ) : (
                        "غير محدد"
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label>الرصيد</Label>
                      <p>{userData?.yourPersonalAccountInfo.account.trim()}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>بيانات الباقة</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>الخدمة الحاليه</Label>
                      <p>{userData?.serviceData.currentService.trim()}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label>اجمالى التحميل المتاح لك</Label>
                      <p>
                        {userData?.yourQuota.totalDownloadAvailableToYou.trim()}{" "}
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label>تاريخ انتهاء الاشتراك</Label>
                      <p>{userData?.yourQuota.subscriptionExpDate.trim()}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>البيانات الشخصية</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>الاسم الكامل</Label>
                      <p>{userData?.personalData.firstName.trim()}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label>الاسم العائلة</Label>
                      <p>{userData?.personalData.familyName.trim()}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label>العنوان</Label>
                      <p>{userData?.personalData.address.trim()}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label>الهاتف</Label>
                      <p>{userData?.personalData.phoneNumber.trim()}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label>البريد الالكتروني</Label>
                      <p>{userData?.personalData.email.trim()}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default Profile;
