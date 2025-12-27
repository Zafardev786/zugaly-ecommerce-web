import axios from "axios";
import { IP } from "../Contant";
import { useEffect, useMemo } from "react";

/* ---------------- CLEAR TOKEN ---------------- */
const clearAuthStorage = () => {
  localStorage.removeItem("seller-token");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
};

/* ---------------- GET API ---------------- */
const getApi = async ({
  endpoint,
  params = {},
  setData,
  setError,
  setLoading,
  token,
}) => {
  try {
    setLoading?.(true);

    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = token;

    const query = new URLSearchParams(params).toString();
    const url = query ? `${IP}/${endpoint}?${query}` : `${IP}/${endpoint}`;

    const res = await axios.get(url, { headers });
    setData?.(res.data);

  } catch (err) {
    const status = err?.response?.status;
    const apiError = err?.response?.data?.error;
    const apiMessage = err?.response?.data?.message;

    // ✅ TOKEN EXPIRED → CLEAR STORAGE (NO REDIRECT)
    if (
      status === 401 &&
      (apiError === "jwt expired" || apiMessage?.includes("expired"))
    ) {
      console.warn("🔐 Token expired → clearing localStorage");
      clearAuthStorage();
      return; // silently stop
    }

    // ❌ Other errors
    setError?.(err?.response?.data || err.message);

  } finally {
    setLoading?.(false);
  }
};

/* ---------------- USE API HOOK ---------------- */
const useApi = ({
  endpoint,
  params = {},
  setData,
  setError,
  setLoading,
  success,
  deleteItem,
  currentPage,
}) => {
  const memoizedParams = useMemo(
    () => params,
    [JSON.stringify(params)]
  );

  useEffect(() => {
    if (!endpoint) return;

    const token =
      localStorage.getItem("seller-token") ||
      localStorage.getItem("user") ||
      null;

    // ✅ Token ho ya na ho → API call allowed
    getApi({
      endpoint,
      params: memoizedParams,
      setData,
      setError,
      setLoading,
      token,
    });

  }, [endpoint, memoizedParams, success, deleteItem, currentPage]);
};

export { getApi, useApi };
