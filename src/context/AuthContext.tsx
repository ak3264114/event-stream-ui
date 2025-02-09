import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthState, User } from "../types/auth";
import { fetchUserData, userLogin, userRegister } from "../utils/requests/ApiServices";
import toast from "react-hot-toast";
import { clearToken, getToken, setToken } from "../utils/CookieManager";
import { useNavigate, useSearchParams } from "react-router-dom";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initializeAuth = async () => {
      if (!getToken()) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetchUserData();
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch {
        clearToken();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await userLogin({ email, password });

      if (res.data?.err) {
        toast.error(res.data.msg);
        return;
      }

      setUser(res.data.user);
      setToken(res.data.token);
      setIsAuthenticated(true);
      const nextPath = searchParams.get("next") || "/";
      navigate(nextPath);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await userRegister({ name, email, phone, password });

      if (res.data?.err) {
        toast.error(res.data.msg);
        return;
      }

      setUser(res.data.user);
      setToken(res.data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    clearToken();
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
