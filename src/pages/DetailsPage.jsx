"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useApi } from "@/components/api/getApi/getApi";
import { useCart } from "@/components/context/CartContext";
import Loader from "@/components/Common/Loader";
import PaymentModal from "@/components/PurchaseProducts/PaymentModal";
import ProductModal from "@/components/ProductCard/ProductModal";

const ProductDetails = () => {
    const { id } = useParams();
    const { cart, addToCart, updateQty } = useCart();
    const [showPayment, setShowPayment] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [openProductModal, setOpenProductModal] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);


    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState("");
    const [loading, setLoading] = useState(false);
    // assume product fetched from API as `product`
    const itemInCart = cart.find((p) => p._id === product?._id);
    const qty = itemInCart?.qty || 0;
    /* =========================
       API CALL
    ========================== */
    useApi({
        endpoint: `users/zugaly/review/product/${id}`,
        setData: (res) => {
            setReviews(res?.reviews || []);
        },
        setLoading: setReviewLoading,
    });

    useApi({
        endpoint: `admin/zugaly/products/get-product/${id}`, // 🔥 apna exact endpoint
        setData: (res) => {
            const data = res?.data;
            setProduct(data);
            setActiveImage(data?.imgSrc?.[0]);
        },
        setLoading,
        setError: console.error,
    });

    if (loading) {
        return <div className="p-6 text-center"><Loader /></div>;
    }

    if (!product) {
        return <div className="p-6 text-center">Product not found</div>;
    }

    const {
        title,
        title_hindi,
        imgSrc = [],
        weight,
        purity,
        netWeight,
        packSize,
        isoLogo,
        manufactureDate,
        expiryDate,
        price,
        finalPrice,
        finalDiscount,
    } = product;

    const mrp = price?.mrp || 0;
    const totalAmount = qty * (finalPrice || 0);

    const handleBuyNow = () => {
        if (qty === 0) {
            alert("Please add quantity first");
            return;
        }

        const productForModal = {
            ...product,
            quantity: qty,     // 🔑 ProductModal qty read karega
        };

        setModalProduct(productForModal);
        setOpenProductModal(true);
    };


    return (
        <div className="max-w-7xl mx-auto p-4 mb-12">
            <div className="flex flex-col lg:flex-row w-full">

                {/* LEFT – THUMBNAILS */}
                <div className="hidden lg:flex flex-col gap-2 pr-4">
                    {imgSrc?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="thumb"
                            onClick={() => setActiveImage(img)}
                            className={`w-20 h-20 object-cover border rounded cursor-pointer
        ${activeImage === img ? "border-red-500" : "border-gray-300"}`}
                        />
                    ))}
                </div>

                {/* CENTER – MAIN IMAGE */}
                <div className="flex justify-center items-center flex-1">
                    <div className="w-full max-w-[460px] h-[460px] bg-white border rounded-lg flex items-center justify-center p-4">
                        <img
                            src={activeImage}
                            alt="product"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </div>

                {/* RIGHT – PRODUCT INFO */}
                <div className="flex-1 pl-0 lg:pl-0 space-y-4">
                    <h1 className="text-2xl font-bold">{title}</h1>

                    {title_hindi && (
                        <p className="text-gray-600 text-lg">{title_hindi}</p>
                    )}

                    {/* Rating (static for now) */}
                    {/* ⭐ PRODUCT RATING (FROM API) */}
                    {product?.rating?.count > 0 ? (
                        <div className="flex items-center gap-2">
                            <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm font-semibold">
                                {product.rating.average.toFixed(1)} ★
                            </span>

                            <span className="text-sm text-gray-500">
                                {product.rating.count} Rating
                                {product.rating.count > 1 && "s"}
                            </span>
                        </div>
                    ) : (
                        <span className="text-sm text-gray-500">
                            No ratings yet
                        </span>
                    )}


                    {/* HIGHLIGHTS */}
                    <div className="text-sm text-gray-700 space-y-1">
                        <p>✔ Weight: {weight}</p>
                        <p>✔ Net Weight: {netWeight}</p>
                        <p>✔ Purity: {purity}</p>
                        <p>✔ Pack Size: {packSize}</p>
                        <p>
                            ✔ Manufactured:{" "}
                            {moment(manufactureDate).format("DD MMM YYYY")}
                        </p>
                        <p>
                            ✔ Expiry:{" "}
                            {moment(expiryDate).format("DD MMM YYYY")}
                        </p>
                    </div>

                    {/* ISO LOGO */}
                    {isoLogo && (
                        <img src={isoLogo} alt="ISO" className="h-10 mt-2" />
                    )}

                    {/* PRICE */}
                    <div>
                        <p className="text-3xl font-bold text-red-600">
                            ₹{finalPrice}
                            {mrp > finalPrice && (
                                <span className="text-gray-400 text-lg line-through ml-2">
                                    ₹{mrp}
                                </span>
                            )}
                        </p>

                        {finalDiscount > 0 && (
                            <p className="text-green-600 text-sm">
                                You save ₹{finalDiscount}
                            </p>
                        )}

                        <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                    </div>

                    {/* CART ACTIONS */}
                    <div className="flex flex-col gap-3 mt-4">


                        <div className="flex gap-4">
                            {qty === 0 ? (
                                <button
                                    onClick={() =>
                                        addToCart(
                                            {
                                                _id: product._id,
                                                imgSrc: product.imgSrc,
                                                title: product.title,
                                                title_hindi: product.title_hindi,
                                                weight: product.weight,
                                                price: product.price,
                                                finalPrice: product.finalPrice,
                                                finalDiscount: product.finalDiscount,
                                                categoryId: product.categoryId,
                                                subCategoryId: product.subCategoryId,
                                            },
                                            1
                                        )
                                    }
                                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded"
                                >
                                    Add to Cart
                                </button>
                            ) : (
                                <div className="flex items-center gap-4 flex-1 justify-center">
                                    <button
                                        onClick={() => updateQty(product._id, qty - 1)}
                                        className="w-10 h-10 bg-red-500 text-white rounded-full text-xl flex items-center justify-center"
                                    >
                                        −
                                    </button>

                                    <span className="text-lg font-semibold">{qty}</span>

                                    <button
                                        onClick={() => updateQty(product._id, qty + 1)}
                                        className="w-10 h-10 bg-green-600 text-white rounded-full text-xl flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded"
                            >
                                Buy Now
                            </button>


                        </div>




                        {qty > 0 && (
                            <div className="flex justify-between items-center bg-gray-50 border rounded p-3">
                                <span className="text-sm text-gray-600">
                                    Total ({qty} item{qty > 1 ? "s" : ""})
                                </span>

                                <span className="text-lg font-bold text-green-700">
                                    ₹{totalAmount}
                                </span>
                            </div>
                        )}
                    </div>



                    {/* BUTTONS */}

                </div>
            </div>

            {/* MOBILE THUMBNAILS */}
            <div className="flex gap-2 mt-4 lg:hidden overflow-x-auto">
                {imgSrc?.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`w-14 h-14 flex-shrink-0 border rounded-md flex items-center justify-center
        ${activeImage === img ? "border-green-600" : "border-gray-300"}`}
                    >
                        <img
                            src={img}
                            alt="thumb"
                            className="max-w-full max-h-full object-contain"
                        />
                    </button>
                ))}
            </div>
            {/* ================= REVIEWS SECTION ================= */}
            <div className="mt-10 border-t pt-6">
                <h2 className="text-xl font-bold mb-4">
                    Ratings & Reviews
                </h2>

                {/* SUMMARY */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-600 text-white px-4 py-2 rounded text-lg font-semibold">
                        {product?.rating?.average || 5} ★
                    </div>
                    <div className="text-sm text-gray-600">
                        {product?.rating?.count || 0} Ratings
                    </div>
                </div>

                {/* LOADING */}
                {reviewLoading && (
                    <p className="text-sm text-gray-500">Loading reviews...</p>
                )}

                {/* NO REVIEWS */}
                {!reviewLoading && reviews.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No reviews yet. Be the first to review this product.
                    </p>
                )}

                {/* REVIEWS LIST */}
                <div className="space-y-3">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white border border-gray-200 rounded-md px-3 py-2 hover:shadow-sm transition"
                        >
                            {/* TOP ROW */}
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-800">
                                    {review.username}
                                </p>

                                <div className="flex items-center gap-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                                    <span>{review.rating}</span>
                                    <span>★</span>
                                </div>
                            </div>

                            {/* DATE */}
                            <p className="text-[11px] text-gray-400 mt-0.5">
                                {moment(review.createdAt).fromNow()}
                            </p>

                            {/* REVIEW TEXT */}
                            {review.remark && (
                                <p className="text-sm text-gray-700 mt-1 leading-snug line-clamp-2">
                                    {review.remark}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

            </div>
            {openProductModal && modalProduct && (
                <ProductModal
                    isOpen={openProductModal}
                    onClose={() => setOpenProductModal(false)}
                    product={modalProduct}   // 🔥 details page se data
                    qty={qty}
                    setQty={() => { }}
                    onUpdateQty={() => { }}
                    onRemove={() => { }}
                    userAddresses={[]}
                    setUserAddresses={() => { }}
                />
            )}

        </div>
    );
};

export default ProductDetails;
