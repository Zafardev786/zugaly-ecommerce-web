"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/components/context/CartContext";
import { useApi } from "@/components/api/getApi/getApi";
import postApi from "@/components/api/postApi/postApi";
import ProductModal from "@/components/ProductCard/ProductModal";
import useSocket from "@/components/api/useSocket/useSocket";
import { useRouter } from "next/navigation";
import withAuth from "@/components/hoc/withAuth";

const CartSummary = () => {
    const router = useRouter();
    const { cart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { socket_data } = useSocket("cartFetched");

    const params = { page: 1, limit: 100 };

    // Fetch initial cart from API
    useApi({
        endpoint: "users/zugaly/view-card/get-cart",
        params,
        setData: (response) => setCartData(response?.data || []),
        setError,
        setLoading,
    });

    // Update cart via socket
    useEffect(() => {
        if (socket_data) setCartData(socket_data.items);
    }, [socket_data]);

    const displayCart = cart?.length > 0 ? cart : cartData;

    // ✅ Remove product handler
    const handleRemoveItem = async (productId) => {
        const dataId = typeof productId === "object" ? productId._id : productId;

        try {
            await postApi("users/zugaly/view-card/delete-from-cart", { productId: dataId });

            // Update local state immediately to prevent stale delete issues
            setCartData((prev) => prev.filter((item) => item._id !== dataId));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <>
            {/* View Cart Button */}
            {displayCart && displayCart.length > 0 && (
                <div className="flex justify-end px-4 mt-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        View Cart Summary ({displayCart.length})
                    </button>
                </div>
            )}

            {/* Product Modal (always mounted, visibility controlled by isOpen) */}
            <ProductModal
                isOpen={isModalOpen && displayCart.length > 0}
                onClose={() => setIsModalOpen(false)}
                product={cartData}
                qty={1}
                setQty={() => { }}
                onRemove={handleRemoveItem}
            />

            {/* Empty Cart Design */}
            {(!displayCart || displayCart.length === 0) && (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 mt-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M7 13h10m0 0l1.2 6M17 13l1.2 6M6 19a2 2 0 104 0 2 2 0 00-4 0zm10 0a2 2 0 104 0 2 2 0 00-4 0z"
                        />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Your cart is empty!
                    </h2>
                    <p className="text-gray-500">
                        Looks like you haven’t added anything yet.
                    </p>
                    <button
                        onClick={() => router.push("/profile-section")}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Shop Nowgdngdngdngf
                    </button>
                </div>
            )}
        </>
    );
}


export default withAuth(CartSummary);