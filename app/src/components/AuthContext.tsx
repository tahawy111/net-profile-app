import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IUserData } from "../lib/types";

// Define the user object type
interface User {
  username: string;
  password: string;
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getUserData: () => Promise<void>;
  userData: IUserData | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const AuthContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  login: async () => {},
  logout: () => {},
  getUserData: async () => {},
  userData: null,
  isLoading: false,
  setIsLoading: (value) => {},
});

// Custom hook to consume the user context
export const useUser = () => useContext(AuthContext);

// User provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user")!) || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const navigate = useNavigate();

  const saveUser = (user: User | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const login = async (username: string, password: string) => {
    try {
      console.log("submit");
      setIsLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password,
      });

      console.log(res);

      toast.success("تم تسجيل الدخول بنجاح");
      const loggedInUser = { username, password };

      console.log(user);

      setUser(loggedInUser);
      saveUser(loggedInUser);
      navigate("/profile"); // assuming you want to navigate to '/profile' after login
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      if (error.response.data.msg) {
        toast.error(error.response.data.msg);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/getUserData/${user?.username}/${
          user?.password
        }`
      );

      setUserData(res.data);
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      if (error.response.data.msg) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const logout = () => {
    setUser(null);
    saveUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        getUserData,
        userData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
