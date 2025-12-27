"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import ProductModal from "./ProductModal";

export default function CartSummary() {
    const { cart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (cart.length === 0) return null;

    console.log("cartcart", cart)

    const totalQty = cart?.reduce((sum, item) => sum + item.qty, 0);
    const totalAmount = cart?.reduce((sum, item) => sum + item.price.offerPrice * item.qty, 0);

    return (
        <>
            <div className="fixed bottom-12 sm:bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 p-3 flex items-center justify-between z-50">
                <div className="text-sm">
                    <span className="font-semibold text-green-700">{totalQty} items</span>
                    <br />
                    <span className="text-gray-600">Total: ₹{totalAmount.toFixed(0)}</span>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white 
                               px-3 py-1.5 text-xs rounded-md 
                               sm:px-4 sm:py-2 sm:text-sm"
                >
                    Book Now
                </button>
            </div>

            {/* ✅ Pass aggregated cart data to modal */}
            {isModalOpen && (
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={cart}
                    qty={1} // pura cart ek single order
                    setQty={() => { }} // cart summary me qty fix h
                />
            )}
        </>
    );
}
