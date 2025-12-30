import { useEffect, useState } from "react";
import { authAPI } from "../api/auth.api";
import { AuthContext } from "./AuthContextType";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    if (token) {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  };

  // Check if user is authenticated on initial load
  useEffect(() => {
    const initAuth = async () => {
      await fetchUser();
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setUser,
    refetchUser: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
