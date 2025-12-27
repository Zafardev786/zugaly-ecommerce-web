import { useAuth } from "@/components/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import postApi from "@/components/api/postApi/postApi";
import NotificationModal from "@/components/Constant/NotificationModal/NotificationModal";
import LoginForm from "@/components/Auth/LoginForm";
import Loader from "@/components/Common/Loader";

const AuthForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  /* ----------------------------------------
     TOKEN EXPIRY CHECK (ON LOAD)
  ---------------------------------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000;

      if (Date.now() >= expiry) {
        localStorage.clear();
        console.log("🔴 Token expired, cleared");
      } else {
        navigate("/profile-section/my-bookings/", { replace: true });
      }
    } catch {
      localStorage.clear();
    }
  }, [navigate]);

  /* ----------------------------------------
     INPUT HANDLERS
  ---------------------------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (error) setError("");
  };

  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);

  const validateFields = () => {
    if (!formData.username.trim()) {
      setError("Please enter email or mobile number.");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Please enter password.");
      return false;
    }
    return true;
  };

  /* ----------------------------------------
     NORMAL LOGIN
  ---------------------------------------- */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);

    try {
      localStorage.clear();

      const payload = {
        email: formData.username.includes("@") ? formData.username : "",
        mobile: /^\d{10}$/.test(formData.username)
          ? formData.username
          : "",
        password: formData.password,
      };

      const res = await postApi(
        "users/zugaly/customer/customer-login",
        payload
      );

      if (!res?.success || !res?.token) {
        throw new Error(res?.message || "Login failed");
      }

      /* Save tokens */
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", res.token);
      if (res.userId) localStorage.setItem("userId", res.userId);
      if (res.role) localStorage.setItem("role", res.role);
      if (res.email) localStorage.setItem("userEmail", res.email);

      login({
        token: res.token,
        userId: res.userId,
        role: res.role,
        email: res.email,
      });

      setNotification({
        isVisible: true,
        type: "success",
        message: "Login successful!",
      });

      setTimeout(() => {
        navigate("/profile-section/my-bookings/", { replace: true });
      }, 400);
      window.location.reload();

    } catch (err) {
      setNotification({
        isVisible: true,
        type: "error",
        message:
          err.response?.data?.message ||
          err.message ||
          "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------
     GOOGLE LOGIN
  ---------------------------------------- */
  const handleGoogleLogin = async (googleRes) => {
    if (!googleRes?.credential) {
      setNotification({
        isVisible: true,
        type: "error",
        message: "Google login failed",
      });
      return;
    }

    setLoading(true);

    try {
      localStorage.clear();

      const res = await postApi(
        "users/zugaly/customer/customer-login",
        { token: googleRes.credential }
      );

      if (!res?.success || !res?.token) {
        throw new Error("Google login failed");
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", res.token);
      if (res.userId) localStorage.setItem("userId", res.userId);
      if (res.role) localStorage.setItem("role", res.role);
      if (res.email) localStorage.setItem("userEmail", res.email);

      login({
        token: res.token,
        userId: res.userId,
        role: res.role,
        email: res.email,
      });

      setNotification({
        isVisible: true,
        type: "success",
        message: "Google login successful!",
      });

      setTimeout(() => {
        navigate("/profile-section/my-bookings/", { replace: true });
      }, 400);
      window.location.reload();

    } catch (err) {
      setNotification({
        isVisible: true,
        type: "error",
        message: err.message || "Google login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------
     ENTER KEY SUBMIT
  ---------------------------------------- */
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [formData]);

  /* ----------------------------------------
     UI
  ---------------------------------------- */
  return (
    <div className="flex items-center justify-center min-h-screen animated-gradient">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <LoginForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          handleGoogleLogin={handleGoogleLogin}
          setIsRegister={setIsRegister}
          setNotification={setNotification}
        />

        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>

          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      <NotificationModal
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification((p) => ({ ...p, isVisible: false }))
        }
      />

      {loading && <Loader />}
    </div>
  );
};

export default AuthForm;
