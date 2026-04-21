import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Silent refresh on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.data.accessToken);
        // Fetch user profile
        const profileRes = await api.get("/users/profile");
        setUser(profileRes.data.data);
      } catch (err) {
        // not logged in
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    setAccessToken(res.data.data.accessToken);
    setUser(res.data.data.user);
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setAccessToken(res.data.data.accessToken);
    setUser(res.data.data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
