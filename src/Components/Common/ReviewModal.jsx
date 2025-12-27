import { useState } from "react";
import { FaStar } from "react-icons/fa";
import postApi from "@/components/api/postApi/postApi";
import NotificationModal from "../Constant/NotificationModal/NotificationModal";

export default function ReviewModal({ products = [], onClose, orderId }) {
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);
    const [remark, setRemark] = useState("");
    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState({
        isVisible: false,
        message: "",
        type: "",
    });

    console.log("RAW PRODUCTS FROM ORDER:", products);

    const handleSubmit = async () => {
        if (!rating || products.length === 0) return;

        /**
         * ✅ IMPORTANT:
         * products = order.items[]
         * we must send orderItemId = item._id
         */
        const payload = {
            orderId,
            products: products
                .map((item) => ({
                    orderItemId: item?._id,   // ✅ CORRECT
                    rating,
                    remark,
                }))
                .filter((p) => p.orderItemId), // safety
        };

        console.log("✅ FINAL REVIEW PAYLOAD:", payload);

        if (payload.products.length === 0) return;

        setLoading(true);

        try {
            const res = await postApi(
                "users/zugaly/review/add-review",
                payload
            );

            if (res?.success) {
                setNotification({
                    isVisible: true,
                    message: "Review saved successfully",
                    type: "success",
                });

                setTimeout(() => {
                    setNotification({
                        isVisible: false,
                        message: "",
                        type: "",
                    });
                    onClose();
                }, 1200);
            } else {
                throw new Error(res?.message || "Failed to save review");
            }
        } catch (error) {
            setNotification({
                isVisible: true,
                message: error.message || "Something went wrong",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
                <h3 className="text-lg font-semibold text-green-700 mb-4">
                    Rate purchased products
                </h3>

                {/* ⭐ STAR RATING */}
                <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={28}
                            className={`cursor-pointer ${(hover || rating) >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                                }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        />
                    ))}
                </div>

                {/* ✍️ REMARK */}
                <textarea
                    rows={3}
                    placeholder="Write your review..."
                    className="w-full border rounded-lg p-2 text-sm"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                />

                {/* ACTIONS */}
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                </div>

                <NotificationModal
                    message={notification.message}
                    type={notification.type}
                    isVisible={notification.isVisible}
                    onClose={() =>
                        setNotification({ ...notification, isVisible: false })
                    }
                />
            </div>
        </div>
    );
}
