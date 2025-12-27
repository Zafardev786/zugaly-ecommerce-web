import { useState } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import OrderDetailsModal from "../Common/OrderDetailsModal";
import ReviewModal from "@/components/Common/ReviewModal";
import Loader from "@/components/Common/Loader";

const BookingHistory = ({ orders = [], loading, title }) => {
  const navigate = useNavigate();

  const [expandedOrders, setExpandedOrders] = useState({});
  const [reviewProducts, setReviewProducts] = useState([]);
  const [reviewOrderId, setReviewOrderId] = useState(null); // ✅ NEW

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });


  const hasPendingReview = (order) =>
    order.items?.some((item) => item.isReviewed !== true);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 py-4 px-4">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="p-2 bg-white rounded-full shadow mb-4"
      >
        <FaArrowLeft />
      </button>

      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
        {title || "Order History"}
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orders.map((order) => {
            const isExpanded = expandedOrders[order._id];

            return (
              <div key={order._id} className="bg-white rounded-xl shadow border">
                <div className="p-4 border-b">
                  <p className="text-sm font-semibold">{order.status}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="p-4">
                  <div className="flex gap-2">
                    {order.items.slice(0, 3).map((item, i) => (
                      <img
                        key={i}
                        src={item.images?.[0]}
                        className="w-12 h-12 rounded border"
                      />
                    ))}
                  </div>

                  {/* ⭐ RATE ORDER */}
                  {order.status === "Delivered" && (
                    <div
                      className="flex items-center gap-1 mt-3 cursor-pointer"
                      onClick={() => {
                        setReviewProducts(order.items); // ✅ items
                        setReviewOrderId(order._id);    // ✅ orderId
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((i) => (
                        <FaStar
                          key={i}
                          className="text-gray-300 hover:text-yellow-400"
                        />
                      ))}


                      {!order.isReviewed && (

                        <span className="text-xs ml-2 text-green-700 font-medium">
                          ⭐ Rate this product
                        </span>
                      )}

                      {order.isReviewed && (
                        <span className="text-green-600 text-xs">
                          ✅ Reviewed
                        </span>
                      )}


                    </div>
                  )}

                  <button
                    className="text-xs text-green-700 mt-3"
                    onClick={() => toggleOrderDetails(order._id)}
                  >
                    {isExpanded ? "Hide" : "Details"}
                  </button>
                </div>

                {isExpanded && (
                  <OrderDetailsModal
                    order={order}
                    onClose={() => toggleOrderDetails(order._id)}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ⭐ REVIEW MODAL */}
      {reviewProducts.length > 0 && reviewOrderId && (
        <ReviewModal
          products={reviewProducts}
          orderId={reviewOrderId}      // ✅ CORRECT
          onClose={() => {
            setReviewProducts([]);
            setReviewOrderId(null);
          }}
        />
      )}
    </div>
  );
};

export default BookingHistory;
