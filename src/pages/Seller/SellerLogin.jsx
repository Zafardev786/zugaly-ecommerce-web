import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/context/AuthContext";
import postApi from "@/components/api/postApi/postApi";
import NotificationModal from "@/components/Constant/NotificationModal/NotificationModal";
import LoginForm from "@/components/Auth/LoginForm";
import Loader from "@/components/Common/Loader";

const SellerLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  /* ---------------- Already Logged-in Check ---------------- */
  useEffect(() => {
    const sellerId = localStorage.getItem("selleId");
    if (sellerId) {
      navigate("/become-seller", { replace: true });
    }
  }, [navigate]);

  /* ---------------- Handlers ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);

  const validateFields = () => {
    if (!formData.username || !formData.password) {
      setError("Please enter email/mobile and password.");
      return false;
    }
    setError("");
    return true;
  };

  /* ---------------- Normal Login ---------------- */
  const handleSubmit = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      const payload = {
        email: formData.username.includes("@")
          ? formData.username
          : "",
        mobile: /^\d+$/.test(formData.username)
          ? formData.username
          : "",
        password: formData.password,
      };

      const response = await postApi(
        "users/zugaly/customer/customer-login",
        payload
      );

      if (response?.success && response?.token) {
        login({
          token: response.token,
          userId: response.userId,
          role: response.role,
        });

        localStorage.setItem("selleId", response.userId);
        localStorage.setItem("seller-token", response.token);

        setNotification({
          message: "Login successful!",
          type: "success",
          isVisible: true,
        });
        window.location.reload();
        setTimeout(() => {
          navigate("/become-seller");
        }, 300);
      }
    } catch (err) {
      setNotification({
        message:
          err.response?.data?.message ||
          err.message ||
          "Login failed",
        type: "error",
        isVisible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Google Login ---------------- */
  const handleGoogleLogin = async (googleResponse) => {
    if (!googleResponse?.credential) return;

    setLoading(true);

    try {
      const response = await postApi(
        "users/zugaly/customer/vender-login",
        { token: googleResponse.credential }
      );

      if (response?.success && response?.token) {
        login({
          token: response.token,
          userId: response.userId,
          role: response.role,
        });

        localStorage.setItem("selleId", response.userId);
        localStorage.setItem("seller-token", response.token);

        setNotification({
          message: "Google login successful!",
          type: "success",
          isVisible: true,
        });

        navigate("/become-seller");
      } else {
        throw new Error("Google login failed");
      }
    } catch (error) {
      setNotification({
        message: error.message || "Google login failed",
        type: "error",
        isVisible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="flex items-center justify-center min-h-screen animated-gradient">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-100 p-2 rounded">
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
        />
      </div>

      <NotificationModal
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification((prev) => ({
            ...prev,
            isVisible: false,
          }))
        }
      />

      {loading && <Loader />}
    </div>
  );
};

export default SellerLogin;
