
export default function PriceSummary({ products, finalTotal }) {
  // Calculate totals
  const totalMrp = products?.reduce(
    (sum, p) => sum + (p.price?.mrp || 0) * (p.qty || 1),
    0
  );
  const totalDiscount = products?.reduce(
    (sum, p) => sum + (p.price?.discountValue || 0) * (p.qty || 1),
    0
  );

  return (
    <div className="text-xs sm:text-sm text-gray-700 space-y-2 border-t pt-2">
      {/* Item-wise Breakdown */}
      <div className="space-y-2">
        <span className="font-semibold text-gray-800">Item-wise Summary</span>
        {products?.map((p, idx) => {
          const qty = p.qty || 1;
          const subtotal = (p.price?.offerPrice || 0) * qty;
          const totalMrpPerItem = (p.price?.mrp || 0) * qty;
          const discountAmount = totalMrpPerItem - subtotal;
          const percentOff = p.price?.discountPercent || Math.round((discountAmount / totalMrpPerItem) * 100);

          return (
            <div
              key={idx}
              className="flex justify-between items-start text-gray-600 text-xs sm:text-sm"
            >
              {/* Left side - Name + Qty */}
              <div>
                <span className="font-medium">{p.title} × {qty}</span>
                <br />
                {discountAmount > 0 && (
                  <span className="text-green-600">
                    Saved ₹{discountAmount.toFixed(0)} ({percentOff}% off)
                  </span>
                )}
              </div>

              {/* Right side - Total MRP (crossed) and Subtotal */}
              <div className="text-right">
                {totalMrpPerItem > 0 && (
                  <span className="text-gray-400 text-[10px] sm:text-xs line-through">
                    ₹{totalMrpPerItem.toFixed(0)}
                  </span>
                )}
                <br />
                <span className="font-semibold">₹ {subtotal.toFixed(0)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grand Total Section */}
      <div className="mt-4 border-t pt-2 space-y-1">
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Total (MRP)</span>
          <span>₹ {totalMrp?.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-green-600 text-sm">
          <span>Total Discount</span>
          <span>-₹ {totalDiscount?.toFixed(0)}</span>
        </div>
        <div className="flex justify-between font-bold text-base sm:text-lg border-t pt-1">
          <span>Grand Total</span>
          <span className="text-green-700">₹ {finalTotal?.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
}
