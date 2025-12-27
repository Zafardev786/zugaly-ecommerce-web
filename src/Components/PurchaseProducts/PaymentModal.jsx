import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../Common/Loader";
import NotificationModal from "../Constant/NotificationModal/NotificationModal";
import postApi from "../api/postApi/postApi";

export default function PaymentModal({ isOpen, onClose, orderData }) {
  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const [finalAmount, setFinalAmount] = useState(orderData?.grandTotal || 0);
  const [onlineDiscount, setOnlineDiscount] = useState(0);

  const navigate = useNavigate();

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "",
  });


  console.log("orderDataorderData", orderData)
  useEffect(() => {
    if (!isOpen) return;

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("seller-token");

    if (!token) {
      onClose?.();
      navigate("/login");
    }
  }, [isOpen, navigate, onClose]);

  /* ---------------- Payment Discount ---------------- */
  useEffect(() => {
    if (!orderData) return;

    if (paymentMode === "online") {
      const discount = (orderData.grandTotal * 2) / 100; // 5% online discount
      setOnlineDiscount(discount);
      setFinalAmount(orderData.grandTotal - discount);
    } else {
      setOnlineDiscount(0);
      setFinalAmount(orderData.grandTotal);
    }
  }, [paymentMode, orderData]);

  if (!isOpen) return null;

  const paymentModes = [
    { label: "Cash on Delivery", value: "cod" },
    { label: "UPI / Debit / Credit Card", value: "online" },
  ];

  /* ---------------- Handle Payment ---------------- */
  const handlePayment = async () => {
    if (!paymentMode) {
      setNotification({
        isVisible: true,
        message: "Please select a payment mode",
        type: "error",
      });
      return;
    }

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("seller-token");

    if (!token) {
      setNotification({
        isVisible: true,
        message: "Please login to continue payment",
        type: "error",
      });

      setTimeout(() => {
        onClose();
        navigate("/login");
      }, 800);

      return;
    }
    try {
      setLoading(true);

      /* -------- COD FLOW -------- */
      if (paymentMode === "cod") {
        await postApi("users/zugaly/create-orders", {
          items: orderData.items,
          appliedCoupon: orderData.appliedCoupon,
          discount: orderData.discount,
          grandTotal: orderData.grandTotal,

          deliveryAddress: orderData.deliveryAddress,
          deliverySchedule: orderData.deliverySchedule,

          orderType: orderData.orderType,
          deliveryType: orderData.deliveryType,

          paymentStatus: "PENDING",
          paymentGateway: "CASH",
        });


        setNotification({
          isVisible: true,
          message: "🎉 Order placed successfully (Cash on Delivery)",
          type: "success",
        });

        setTimeout(() => {
          onClose();
          navigate("/profile-section/my-bookings");
        }, 800);

        return;
      }

      /* -------- ONLINE (PAYU) FLOW -------- */
      /* -------- ONLINE (RAZORPAY) FLOW -------- */
      if (paymentMode === "online") {
        const ok = await loadRazorpay();
        if (!ok) {
          setNotification({
            isVisible: true,
            message: "Razorpay SDK failed to load",
            type: "error",
          });
          return;
        }

        // ✅ STEP 1: CREATE ORDER IN DB
        const createOrderRes = await postApi(
          "users/zugaly/create-orders",
          {
            items: orderData.items,
            appliedCoupon: orderData.appliedCoupon,
            discount: orderData.discount,
            grandTotal: orderData.grandTotal,

         
          deliveryAddress: orderData.deliveryAddress,
          deliverySchedule: orderData.deliverySchedule,

            orderType: "Product",
            deliveryType: "Home Delivery",

            paymentStatus: "PENDING",
            paymentGateway: "RAZORPAY",
          }
        );

        const orderId = createOrderRes?.order?._id;

        if (!orderId) {
          setNotification({
            isVisible: true,
            message: "Order creation failed",
            type: "error",
          });
          return;
        }

        // ✅ STEP 2: INITIATE RAZORPAY WITH ORDER ID
        const rp = await postApi(
          `users/zugaly/payment/razorpay/initiate/${orderId}`
        );

        const options = {
          key: rp.key,
          amount: rp.amount,
          currency: "INR",
          order_id: rp.razorpayOrderId,
          name: "Zugaly",
          description: "Order Payment",

          handler: async (res) => {
            await postApi("users/zugaly/payment/razorpay/verify", {
              ...res,
              orderId,
            });

            navigate("/profile-section/my-bookings");
          },

          theme: { color: "#16a34a" },
        };

        new window.Razorpay(options).open();
      }



    } catch (error) {
      console.error(error);

      if (error?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setNotification({
          isVisible: true,
          message: error?.message || "Payment failed",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };



  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });


  return (
    <>

      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[80vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>

          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-700">
            Select Payment Mode
          </h2>

          <div className="space-y-3">
            {paymentModes.map((mode) => (
              <label
                key={mode.value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="paymentMode"
                  value={mode.value}
                  checked={paymentMode === mode.value}
                  onChange={() => setPaymentMode(mode.value)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">{mode.label}</span>
              </label>
            ))}
          </div>

          {onlineDiscount > 0 && (
            <p className="mt-2 text-green-600 font-semibold">
              🎉 Online payment discount: ₹{onlineDiscount}
            </p>
          )}

          <p className="mt-1 font-semibold">
            Total Payable: ₹{finalAmount}
          </p>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600
              hover:from-indigo-600 hover:to-blue-500
              text-white font-semibold py-3 rounded-full
              flex items-center justify-center gap-2
              shadow-md hover:shadow-lg active:scale-95
              transition-all disabled:opacity-60"
          >
            {loading ? <Loader size={20} /> : "Proceed"}
          </button>
        </div>
      </div>

      {/* Notification */}
      <NotificationModal
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification({ ...notification, isVisible: false })
        }
      />
    </>
  );
}
