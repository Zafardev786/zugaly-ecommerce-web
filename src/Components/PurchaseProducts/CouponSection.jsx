

export default function CouponSection({ coupon, setCoupon, handleApplyCoupon }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        placeholder="Coupon code"
        className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2 focus:ring-1 focus:ring-green-500 focus:outline-none"
      />
      <button
        onClick={handleApplyCoupon}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-lg font-medium whitespace-nowrap"
      >
        Apply
      </button>
    </div>
  );
}
