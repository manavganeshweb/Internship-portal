import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginStudent,
  loginAdmin,
  registerStudent,
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const saveAuth = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.student || data.admin));

    setToken(data.token);
    setUser(data.student || data.admin);
  };

  const studentLogin = async (credentials) => {
    const data = await loginStudent(credentials);
    saveAuth(data);
    return data;
  };

  const adminLogin = async (credentials) => {
    const data = await loginAdmin(credentials);
    saveAuth(data);
    return data;
  };

  const register = async (studentData) => {
    const data = await registerStudent(studentData);
    saveAuth(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    isStudent: user?.role === "student",
    isAdmin: user?.role === "admin",
    studentLogin,
    adminLogin,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};