const CartGuide = ({ show, cartCount }) => {
  if (!show) return null;

  return (
    <div
      className="
        fixed right-4 top-1/3 z-50 w-64
        bg-white border shadow-xl rounded-xl p-4
        transition-all duration-500 ease-out
        animate-slide-in
      "
    >
      {/* Header */}
      <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
        <span className="animate-bounce">👋</span> How to use Cart
      </h3>

      {/* Steps */}
      <ul className="text-sm text-gray-600 space-y-2">
        <li className="flex gap-2">
          <span>🛒</span> Add product to cart
        </li>
        <li className="flex gap-2">
          <span className="animate-pulse">➡</span>
          Click <b>View Cart Summary</b>
        </li>
        <li className="flex gap-2">
          <span>✅</span> Review & Checkout
        </li>
      </ul>

      {/* Cart Count */}
      {cartCount > 0 && (
        <div className="mt-3 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md animate-pulse">
          {cartCount} item added ✔
        </div>
      )}
    </div>
  );
};

export default CartGuide;


