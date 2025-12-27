import { useState, useEffect } from "react";
import Loader from "../Common/Loader";
import NotificationModal from "../Constant/NotificationModal/NotificationModal";

import ProductTable from "../PurchaseProducts/ProductTable";
import CouponSection from "../PurchaseProducts/CouponSection";
import PriceSummary from "../PurchaseProducts/PriceSummary";
import PaymentModal from "../PurchaseProducts/PaymentModal";
import AddressModal from "../ProfileSection/AddressModal";
import { useApi } from "../api/getApi/getApi";

export default function ProductModal({
  isOpen,
  onClose,
  product,
  qty,
  setQty,
  onUpdateQty,   // ✅ ADD
  onRemove,
  userAddresses,
  setUserAddresses,
}) {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];





  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  // const today = new Date();
  const todayObj = new Date(); // ✅ Date object
  const todayStr = todayObj.toISOString().split("T")[0]; // ✅ string (YYYY-MM-DD)

  const maxDateObj = new Date();
  maxDateObj.setDate(todayObj.getDate() + 30);
  const maxDateStr = maxDateObj.toISOString().split("T")[0];

  const [deliveryDate, setDeliveryDate] = useState(todayStr);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [addressOpen, setAddressOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const hasAddress =
    profile &&
    Array.isArray(profile.addresses) &&
    profile.addresses.length > 0;




  useApi({
    endpoint: "users/zugaly/customer/my-profile",
    setData: (res) => {
      setProfile(res?.user || null);
      setUserAddresses(res?.user?.addresses || []);
    },
    setLoading: setProfileLoading,
  });

  /* ---------------- Auth Check ---------------- */
  useEffect(() => {

    let usertoken = localStorage.getItem("user")
    let sellertoken = localStorage.getItem("seller-token")
    const token = sellertoken || usertoken;
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (deliveryDate === today && !deliveryTime) {
      setDeliveryTime("12:00 PM - 03:00 PM");
    }
  }, [deliveryDate]);


  const currentAddress =
    profile?.addresses && profile.addresses.length > 0
      ? profile.addresses[0]
      : null;


  if (!isOpen) return null;

  /* ---------------- Coupon Data ---------------- */
  const couponList = [
    { coupon_name: "silver", discount_percentage: "10%" },
    { coupon_name: "gold", discount_percentage: "20%" },
    { coupon_name: "flat50", discount_amount: 50 },
  ];

  const products = Array.isArray(product) ? product : [product];
  const totalPrice = products.reduce(
    (sum, p) =>
      sum + (p.price?.offerPrice || 0) * (p.quantity ?? 1),
    0
  );


  const finalTotal = totalPrice - discount;

  /* ---------------- Coupon Apply ---------------- */
  const handleApplyCoupon = () => {
    const foundCoupon = couponList.find(
      (c) => c.coupon_name.toLowerCase() === coupon.toLowerCase()
    );

    if (!foundCoupon) {
      setDiscount(0);
      setNotification({
        isVisible: true,
        message: "❌ Invalid coupon code!",
        type: "error",
      });
      return;
    }

    let d = 0;
    if (foundCoupon.discount_percentage) {
      const percent = parseFloat(
        foundCoupon.discount_percentage.replace("%", "")
      );
      d = (totalPrice * percent) / 100;
    } else if (foundCoupon.discount_amount) {
      d = foundCoupon.discount_amount;
    }

    setDiscount(d);
    setNotification({
      isVisible: true,
      message: `🎉 Coupon "${foundCoupon.coupon_name}" applied! You saved ₹${d}`,
      type: "success",
    });
  };

  /* ---------------- Book Now ---------------- */
  const handleBookNow = () => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }

    // ⛔ Profile abhi load nahi hua
    if (profileLoading) return;

    // ✅ ADDRESS CHECK FROM API
    if (!hasAddress) {
      if (!addressOpen) {
        setAddressOpen(true); // only once
      }
      return;
    }
    if (!deliveryDate || !deliveryTime) {
      setNotification({
        isVisible: true,
        message: "Please select delivery date and time",
        type: "error",
      });
      return;
    }


    const order = {
      items: products.map((p) => ({
        title: p.title,
        productId: p._id,
        title_hindi: p.title_hindi,
        weight: p.weight,
        purity: p.purity,
        price: p.price,
        qty: p.qty || qty || p.quantity,
        totalPrice:
          (p.price?.offerPrice || 0) *
          (p.qty || qty || p.quantity),
        images: p.imgSrc || [],
      })),

      grandTotal: finalTotal,
      discount,
      appliedCoupon: coupon,

      // ✅ UI wala address
      deliveryAddress: currentAddress,

      // ✅ delivery date & time
      deliverySchedule: {
        date: deliveryDate,
        time: deliveryTime,
      },

      orderType: "Product",
      deliveryType: "Home Delivery",
    };

    setOrderData(order);
    setPaymentOpen(true);


    setOrderData(order);
    setPaymentOpen(true);
  };


  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 pb-10">
        <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-lg p-3 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh] text-xs sm:text-sm md:text-base">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
          >
            ✕
          </button>

          {/* Update Address */}
          {/* CURRENT ADDRESS PREVIEW */}
          {currentAddress && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between
    gap-2 sm:gap-4 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 mb-3">

              <div className="text-xs sm:text-sm text-gray-700 leading-tight">
                <p className="font-semibold text-gray-800">
                  📍 Delivery Address
                </p>

                <p className="text-gray-600">
                  {currentAddress.houseNumber && `${currentAddress.houseNumber}, `}
                  {currentAddress.street && `${currentAddress.street}, `}
                  {currentAddress.area}
                </p>

                <p className="text-gray-600">
                  {currentAddress.city}, {currentAddress.state} –{" "}
                  <span className="font-semibold">
                    {currentAddress.pinCode}
                  </span>
                </p>
              </div>

              <button
                onClick={() => setAddressOpen(true)}
                className="whitespace-nowrap text-xs sm:text-sm
        bg-blue-500 hover:bg-blue-600 text-white
        px-3 py-1.5 rounded shadow"
              >
                Change
              </button>
            </div>
          )}
          {/* DELIVERY DATE & TIME */}
          <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-3 mb-4">
            <p className="font-semibold text-gray-800 mb-2">
              🚚 Select Delivery Date & Time
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* DATE */}
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Delivery Date
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  min={todayStr}
                  max={maxDateStr}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                />

              </div>

              {/* TIME */}
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Delivery Time Slot
                </label>
                <select
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select time slot</option>
                  <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM</option>
                  <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                  <option value="06:00 PM - 09:00 PM">06:00 PM - 09:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-sm sm:text-xl md:text-2xl font-bold mb-3 text-green-700">
            {products.length > 1 ? "Selected Products" : products[0]?.title}
          </h2>

          {/* Product Table */}
          <ProductTable
            products={products}
            product={product}
            qty={qty}
            setQty={setQty}
            onRemove={onRemove}
            onUpdateQty={onUpdateQty}
            loading={loading}

          />

          {/* Coupon & Price */}
          <div className="mt-4 border-t pt-4 space-y-3">
            <CouponSection
              coupon={coupon}
              setCoupon={setCoupon}
              handleApplyCoupon={handleApplyCoupon}
            />
            <PriceSummary
              totalPrice={totalPrice}
              discount={discount}
              finalTotal={finalTotal}
              products={products}
            />
          </div>

          {/* Book Now */}
          <button
            onClick={handleBookNow}
            disabled={loading}
            className="mt-5 w-full bg-gradient-to-r from-blue-200 to-teal-200 hover:from-teal-200 hover:to-blue-200
              text-gray-800 font-semibold py-2 sm:py-3 rounded-full
              flex items-center justify-center gap-2 shadow-md hover:shadow-lg
              active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? <Loader size={14} /> : "🚀 Book Now"}
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

      {/* Payment Modal */}
      {paymentOpen && orderData && (
        <PaymentModal
          isOpen={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          orderData={orderData}
        />
      )}

      {/* Address Modal */}
      {addressOpen && (
        <AddressModal
          isOpen={addressOpen}
          onClose={() => setAddressOpen(false)}
          userAddresses={userAddresses}
          setUserAddresses={setUserAddresses}
        />
      )}
    </>
  );
}
