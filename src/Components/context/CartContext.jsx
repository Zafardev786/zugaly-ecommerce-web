import { createContext, useContext, useState } from "react";
import postApi from "../api/postApi/postApi";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 🔐 check login
  let usertoken = localStorage.getItem("user")
  let sellertoken = localStorage.getItem("seller-token")
  const token = sellertoken || usertoken;
  const isLoggedIn = !!token;

  /* ---------------- Add To Cart ---------------- */
  const addToCart = async (product, qty = 1) => {
    const cartItem = {
      _id: product._id,
      title: product.title || "",
      title_hindi: product.title_hindi || "",
      price: product.price || { mrp: 0, offerPrice: 0 },
      weight: product.weight || "-",
      purity: product.purity || "-",
      imgSrc: product.imgSrc || [],
      qty,
      quantity: qty,
      categoryId: product.categoryId || null,
      subCategoryId: product.subCategoryId || null,
    };

    // ✅ Frontend update (ALWAYS)
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, qty: p.qty + qty, quantity: p.quantity + qty }
            : p
        );
      }
      return [...prev, cartItem];
    });

    // 🚫 Guest → backend sync skip
    if (!isLoggedIn) return;

    // ✅ Backend sync (ONLY if logged in)
    try {
      await postApi("users/zugaly/view-card/add-to-cart", {
        productId: product._id,
        quantity: qty,
        cartItem,
      });
    } catch (error) {
      console.error("Add to Cart API failed:", error);
    }
  };

  /* ---------------- Update Quantity ---------------- */
  const updateQty = async (_id, newQty) => {
    // ✅ Frontend update
    setCart((prev) =>
      prev
        .map((p) =>
          p._id === _id ? { ...p, qty: newQty, quantity: newQty } : p
        )
        .filter((p) => p.qty > 0)
    );

    // 🚫 Guest → skip backend
    if (!isLoggedIn) return;

    // ✅ Backend sync
    try {
      await postApi("users/zugaly/view-card/add-to-cart", {
        productId: _id,
        quantity: newQty,
      });
    } catch (error) {
      console.error("Update Cart Quantity API failed:", error);
    }
  };

  /* ---------------- Clear Cart ---------------- */
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

/* ---------------- Hook ---------------- */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
