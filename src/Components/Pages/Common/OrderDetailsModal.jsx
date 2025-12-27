import { useState } from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const nextImage = (orderId, itemIndex, images) => {
    setCurrentImageIndexes((prev) => {
      const key = `${orderId}-${itemIndex}`;
      const current = prev[key] || 0;
      return { ...prev, [key]: (current + 1) % images.length };
    });
  };

  const prevImage = (orderId, itemIndex, images) => {
    setCurrentImageIndexes((prev) => {
      const key = `${orderId}-${itemIndex}`;
      const current = prev[key] || 0;
      return {
        ...prev,
        [key]: (current - 1 + images.length) % images.length,
      };
    });
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* ---------- HEADER ---------- */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-green-800">
              Order Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* ---------- ORDER INFO ---------- */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg grid grid-cols-2 gap-4">
            {/* ---------- DELIVERY SCHEDULE ---------- */}
            {/* ---------- DELIVERY SCHEDULE ---------- */}
            {order.deliverySchedule?.date && (
              <div className="col-span-2 bg-white rounded-md p-3 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">
                  🚚 Delivery Schedule
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm">
                  <span className="font-medium text-gray-800">
                    📅 {formatDeliveryDate(order.deliverySchedule.date)}
                  </span>

                  {order.deliverySchedule?.time && (
                    <span className="text-gray-600">
                      ⏰ {order.deliverySchedule.time}
                    </span>
                  )}
                </div>
              </div>
            )}


            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-medium">{order._id.slice(-8)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium">{order.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="font-medium text-green-700">
                ₹{order.grandTotal?.toFixed(2)}
              </p>
            </div>
          </div>

          {/* ---------- ITEMS ---------- */}
          <div className="space-y-4">
            {order?.items?.map((item, itemIndex) => {
              const key = `${order._id}-${itemIndex}`;
              const currentIndex = currentImageIndexes[key] || 0;
              const hasMultiple = item.images?.length > 1;

              return (
                <div
                  key={itemIndex}
                  className="flex justify-between items-start border-b pb-4 last:border-b-0"
                >
                  <div className="flex gap-3">
                    {/* IMAGE */}
                    <div className="w-16 h-16 relative rounded-md overflow-hidden border">
                      {item.images?.length ? (
                        <>
                          <img
                            src={
                              item.images[currentIndex] ||
                              "/placeholder.png"
                            }
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />

                          {hasMultiple && (
                            <>
                              <button
                                onClick={() =>
                                  prevImage(
                                    order._id,
                                    itemIndex,
                                    item.images
                                  )
                                }
                                className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1"
                              >
                                ‹
                              </button>
                              <button
                                onClick={() =>
                                  nextImage(
                                    order._id,
                                    itemIndex,
                                    item.images
                                  )
                                }
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1"
                              >
                                ›
                              </button>

                              <div className="absolute bottom-1 inset-x-0 flex justify-center gap-1">
                                {item.images.map((_, i) => (
                                  <span
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${i === currentIndex
                                      ? "bg-white"
                                      : "bg-white/50"
                                      }`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                          📦
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div>
                      <h4 className="font-medium text-sm">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.title_hindi}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          {item.weight}
                        </span>
                        <span className="text-xs text-gray-500">
                          Qty: {item.qty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-700">
                      ₹{item.price?.offerPrice?.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 line-through">
                      ₹{item.price?.mrp?.toFixed(2)}
                    </p>
                    <p className="text-xs font-semibold mt-1">
                      ₹
                      {(
                        item.qty * item.price?.offerPrice
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------- SUMMARY ---------- */}
          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold text-green-800 mb-3">
              Order Summary
            </h4>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{order.grandTotal?.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">
                  -₹{order.discount?.toFixed(2)}
                </span>
              </div>

              {order.appliedCoupon && (
                <div className="flex justify-between">
                  <span>Coupon</span>
                  <span className="bg-blue-50 text-blue-700 px-2 rounded">
                    {order.appliedCoupon}
                  </span>
                </div>
              )}

              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-green-700">
                  ₹{order.grandTotal?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* ---------- PAYMENT ---------- */}
          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold text-green-800 mb-3">
              Payment Information
            </h4>

            <div>
              <p className="text-gray-600">Payment Method</p>
              <p className="font-medium">
                {order.paymentGateway || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Payment Status</p>
              <p className="font-medium">
                {order.paymentStatus || "Pending"}
              </p>
            </div>

            {order.razorpayPaymentId && (
              <div className="sm:col-span-2">
                <p className="text-gray-600">Transaction ID</p>
                <p className="font-medium text-xs">
                  {order.razorpayPaymentId}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
