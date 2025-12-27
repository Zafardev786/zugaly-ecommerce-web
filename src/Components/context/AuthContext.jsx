import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ----------------------------------------
     CHECK AUTH ON LOAD
  ---------------------------------------- */
  useEffect(() => {
    try {
      let usertoken = localStorage.getItem("user")
      let sellertoken = localStorage.getItem("seller-token")
      const token = sellertoken || usertoken;

      if (!token) {
        setLoading(false);
        return;
      }

      // ✅ JWT expiry check
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = Date.now() >= payload.exp * 1000;

      if (isExpired) {
        localStorage.clear();
        setUser(null);
        if (location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      } else {
        setUser({ token });
        if (location.pathname === "/login") {
          navigate("/profile-section/my-bookings", { replace: true });
        }
      }
    } catch (err) {
      console.error("Auth init error:", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, [navigate, location.pathname]);

  /* ----------------------------------------
     LOGIN
  ---------------------------------------- */
  const login = ({ token, userId, role, email }) => {
    localStorage.setItem("user", token);
    if (userId) localStorage.setItem("userId", userId);
    if (role) localStorage.setItem("role", role);
    if (email) localStorage.setItem("userEmail", email);

    setUser({ token });
    navigate("/profile-section/my-bookings", { replace: true });
  };

  /* ----------------------------------------
     LOGOUT
  ---------------------------------------- */
  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login", { replace: true });
  };

  if (loading) return null; // or Loader

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ----------------------------------------
   CUSTOM HOOK
---------------------------------------- */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
