import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "@/components/context/CartContext";
import { useApi } from "@/components/api/getApi/getApi";
import ProductModal from "@/components/ProductCard/ProductModal";
import useSocket from "@/components/api/useSocket/useSocket";
import CartGuide from "@/components/CartGuide";
import postApi from "@/components/api/postApi/postApi";

const Cart = () => {
    const [showGuide, setShowGuide] = useState(true);




    const navigate = useNavigate();

    const { cart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [qtyLoading, setQtyLoading] = useState(false);

    const { socket_data } = useSocket("cartFetched");

    const params = { page: 1, limit: 100 };

    useEffect(() => {
        if (isModalOpen) {
            setShowGuide(false);
        }
    }, [isModalOpen]);

    /* ---------------- FETCH CART ---------------- */
    useApi({
        endpoint: "users/zugaly/view-card/get-cart",
        params,
        setData: (response) => setCartData(response?.data || []),
        setError,
        setLoading,
    });

    useEffect(() => {
        if (socket_data?.items && !loading && !qtyLoading) {
            setCartData(socket_data.items);
        }
    }, [socket_data, loading, qtyLoading]);



    /* ---------------- CART SOURCE ---------------- */
    const displayCart = cartData;


    /* ---------------- REMOVE ITEM ---------------- */
    const handleRemoveItem = (productId) => {
        setCartData((prev) =>
            prev.filter((item) => item._id !== productId)
        );
    };

    /* ---------------- UPDATE QTY ---------------- */
    const handleUpdateQty = async(productId, newQty) => {

        console.log("  quantity: newQty,", productId, newQty,)
        await postApi("users/zugaly/view-card/update-cart-qty", {
            productId,
            quantity: newQty,
        });
        setCartData((prev) =>
            prev.map((item) =>
                item._id === productId
                    ? { ...item, quantity: newQty }
                    : item
            )
        );

    };


    return (
        <>
            {/* ---------------- VIEW CART BUTTON ---------------- */}
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

            {/* ---------------- CART MODAL ---------------- */}
            <ProductModal
                isOpen={isModalOpen && displayCart.length > 0}
                onClose={() => setIsModalOpen(false)}
                product={displayCart}
                qty={1}
                setQty={() => { }}
                onRemove={handleRemoveItem}
                onUpdateQty={handleUpdateQty}   // ✅ NEW
            />


            {
                !isModalOpen && (
                    <CartGuide
                        show={true}
                        cartCount={displayCart.length}
                    />
                )
            }


            {/* ---------------- EMPTY CART ---------------- */}
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
                        onClick={() => navigate("/profile-section")}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Shop Now
                    </button>
                </div>
            )}
        </>
    );
};

export default Cart;
