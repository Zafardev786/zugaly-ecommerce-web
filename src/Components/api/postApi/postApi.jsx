// import axios from "axios";
// import { IP } from "../Contant";

// const postApi = async (endpoint, data = {}) => {
//   try {
//     // 🔐 Token priority
//     const sellerToken = localStorage.getItem("seller-token");
//     const userToken = localStorage.getItem("user");

//     const token = sellerToken || userToken; // ✅ seller-token first

//     const headers = {};

//     // ✅ token ho tabhi bhejo
//     if (token) {
//       headers.Authorization = token; 
//       // agar backend chahe to:
//       // headers.Authorization = `Bearer ${token}`;
//     }

//     // ✅ FormData ke case me content-type mat bhejo
//     if (!(data instanceof FormData)) {
//       headers["Content-Type"] = "application/json";
//     }

//     console.log("🔵 POST API:", `${IP}/${endpoint}`);
//     console.log("🟢 Using Token:", sellerToken ? "SELLER" : userToken ? "USER" : "GUEST");

//     const response = await axios.post(
//       `${IP}/${endpoint}`,
//       data,
//       { headers }
//     );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ POST API Error:",
//       error?.response?.data || error.message
//     );

//     // ❌ yahan redirect bilkul nahi
//     throw error?.response?.data || error;
//   }
// };

// export default postApi;
import axios from "axios";
import { IP } from "../Contant";

/* ---------------- CLEAR TOKEN ---------------- */
const clearAuthStorage = () => {
  localStorage.removeItem("seller-token");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
};

/* ---------------- POST API ---------------- */
const postApi = async (endpoint, data = {}) => {
  try {
    const sellerToken = localStorage.getItem("seller-token");
    const userToken = localStorage.getItem("user");
    const token = sellerToken || userToken || null;

    const headers = {};

    // ✅ token ho tabhi bhejo
    if (token) {
      headers.Authorization = token;
    }

    // ✅ FormData ke case me content-type mat bhejo
    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const url = `${IP}/${endpoint}`;

    const res = await axios.post(url, data, { headers });

    return res.data;

  } catch (err) {
    const status = err?.response?.status;
    const apiError = err?.response?.data?.error;
    const apiMessage = err?.response?.data?.message;

    /* ✅ TOKEN EXPIRED → CLEAR STORAGE (NO REDIRECT) */
    if (
      status === 401 &&
      (apiError === "jwt expired" || apiMessage?.includes("expired"))
    ) {
      console.warn("🔐 Token expired → clearing localStorage");
      clearAuthStorage();
      return; // silently stop
    }

    /* ❌ OTHER ERRORS */
    throw err?.response?.data || err;
  }
};

export default postApi;
