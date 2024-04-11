import { DollarSign, LogOut, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useUser } from "./AuthContext";
import Spinner from "./Spinner";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const setActiveColor = (pathname: string): string => {
    return pathname === location.pathname ? "text-[#428cff]" : "";
  };
  const { user } = useUser();

  return (
    <div className="flex flex-col justify-between h-screen">
      <Spinner />
      <div className="">{children}S</div>

      {/* Tab bar */}
      {user && (
        <div className="h-[56px] w-full bg-[#1f1f1f] flex justify-evenly z-[1]">
          <Link className="cursor-pointer" to={"/profile"}>
            <div
              className={cn(
                "flex flex-col items-center mt-1",
                setActiveColor("/profile")
              )}
            >
              <User />
              <div>الملف الشخصي</div>
            </div>
          </Link>
          <Link className="cursor-pointer" to={"/renew"}>
            <div
              className={cn(
                "flex flex-col items-center mt-1",
                setActiveColor("/renew")
              )}
            >
              <DollarSign />
              <div>تجديد الاشتراك</div>
            </div>
          </Link>
          <Link className="cursor-pointer" to={"/logout"}>
            <div
              className={cn(
                "flex flex-col items-center mt-1",
                setActiveColor("/logout")
              )}
            >
              <LogOut />
              <div>تسجيل الخروج</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
