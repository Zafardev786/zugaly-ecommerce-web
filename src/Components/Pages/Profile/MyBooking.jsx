import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OrderDetailsModal from "../Common/OrderDetailsModal";
import Loader from "@/components/Common/Loader";


const MyBooking = ({ orders = [], loading }) => {


  const navigate = useNavigate();
  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          dot: "bg-green-500",
        };
      case "Pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          dot: "bg-yellow-500",
        };
      case "Cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          dot: "bg-red-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          dot: "bg-gray-500",
        };
    }
  };
  const formatDeliveryDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 py-4 px-4">
      {/* ---------------- BACK BUTTON ---------------- */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
      </div>

      {/* ---------------- HEADER ---------------- */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          My Orders
        </h1>
        <p className="text-gray-600">
          Track and manage your orders
        </p>
      </div>

      {/* ---------------- LOADING ---------------- */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {orders?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {orders?.map((order) => {
                const statusColor = getStatusColor(order.status);
                const isExpanded = expandedOrders[order._id];

                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition"
                  >
                    {/* ---------------- ORDER HEADER ---------------- */}
                    <div className="p-4 bg-gradient-to-r from-green-50 to-white border-b">
                      <div className="flex flex-col gap-2">
                        <div className="space-y-1.5">
                          {/* STATUS */}
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${statusColor.dot}`}
                            />
                            <span
                              className={`text-sm font-semibold ${statusColor.text}`}
                            >
                              {order.status}
                            </span>
                          </div>

                          {/* ORDER PLACED */}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Order Placed</span>
                            <span className="font-medium text-gray-700">
                              {formatDate(order.createdAt)}
                            </span>
                          </div>

                          {/* DELIVERY SCHEDULE */}
                          {order.deliverySchedule?.date && (
                            <div className="mt-1 rounded-md bg-blue-50 px-2 py-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1 text-blue-700 font-medium">
                                  🚚 Delivery
                                </span>
                                <span className="text-gray-800 font-semibold">
                                  {formatDeliveryDate(order.deliverySchedule.date)}
                                </span>
                              </div>

                              {order.deliverySchedule?.time && (
                                <div className="flex items-center justify-end text-[11px] text-gray-600 mt-0.5">
                                  ⏰ {order.deliverySchedule.time}
                                </div>
                              )}
                            </div>
                          )}

                          {/* ORDER ID */}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                            <span>Order ID</span>
                            <span className="font-mono text-gray-700">
                              #{order._id.slice(-8)}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Total Amount
                          </p>
                          <p className="text-lg font-bold text-green-700">
                            ₹{order.grandTotal?.toFixed(2)}
                          </p>
                          <span
                            className={`text-sm font-semibold ${statusColor.text}`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ---------------- ITEMS PREVIEWjhfd ---------------- */}
                    <div className="p-4">
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-lg overflow-hidden border flex-shrink-0"
                          >
                            <img
                              src={item.images?.[0] || "/placeholder.png"}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}

                        {order.items.length > 3 && (
                          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border">
                            <span className="text-green-700 text-xs font-semibold">
                              +{order.items.length - 3}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        <p className="text-xs text-gray-600">
                          {order.items.length} item
                          {order.items.length !== 1 && "s"}
                        </p>

                        <button
                          onClick={() => toggleOrderDetails(order._id)}
                          className="flex items-center text-green-700 text-xs font-medium hover:text-green-900"
                        >
                          {isExpanded ? "Hide" : "Details"}
                          <svg
                            className={`ml-1 h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""
                              }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>



                    {/* ---------------- ORDER DETAILS MODAL ---------------- */}
                    {isExpanded && (
                      <OrderDetailsModal
                        order={order}
                        onClose={() =>
                          toggleOrderDetails(order._id)
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* ---------------- EMPTY STATE ---------------- */
            <div className="text-center py-16 bg-white rounded-xl shadow-lg border">
              <div className="mx-auto h-24 w-24 text-green-300 mb-4">
                🛒
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                You haven't placed any orders yet.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Start Shopping
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyBooking;
