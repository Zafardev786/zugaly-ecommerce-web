import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


export default function ProductCard({
  _id,
  imgSrc,
  title,
  title_hindi,
  weight,
  price,
  offerValue,
  finalPrice,
  finalDiscount,
  categoryId,
  subCategoryId,
  rating,   // 📝 default 0
}) {
  const { cart, addToCart, updateQty } = useCart();
  const navigate = useNavigate();

  const itemInCart = cart.find((p) => p._id === _id);
  const qty = itemInCart?.qty || 0;

  const mrp = price?.mrp ?? 0;

  const discountPercent =
    mrp > 0
      ? finalDiscount > 0
        ? Math.round((finalDiscount / mrp) * 100)
        : finalPrice > 0
          ? Math.round(((mrp - finalPrice) / mrp) * 100)
          : 0
      : 0;

  const effectiveDiscount =
    finalDiscount > 0
      ? finalDiscount
      : mrp > 0 && finalPrice > 0
        ? mrp - finalPrice
        : 0;

  // ⭐ SAFE RATING & REVIEWS (product se direct)
  const safeRating =
    Number(rating?.average) > 0 ? Number(rating.average) : 5;

  const safeReviewsCount =
    Number(rating?.count) > 0 ? Number(rating.count) : 0;


  return (
    <div    onClick={() => navigate(`/product-details/${_id}`)} className="w-full bg-white rounded-md shadow-sm hover:shadow-md transition overflow-hidden relative text-[10px] sm:text-[11px] flex flex-col">
      {/* RATING & REVIEWS */}



      {/* IMAGE */}
      <div className="relative w-full h-28 sm:h-40">
        <img
          src={imgSrc?.length ? imgSrc[0] : "/placeholder.png"}
          alt={title}
          className="w-full h-full object-cover rounded-t-md"
          loading="lazy"
        />

        {/* Weight */}
        <span className="absolute top-1 left-1 bg-green-100 text-green-800 text-[8px] sm:text-[12px] px-1 py-0.5 rounded-sm">
          {weight}
        </span>

        {/* Discount % */}
        {discountPercent > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] sm:text-[12px] px-1 py-0.5 rounded-sm shadow">
            {discountPercent}% OFF
          </span>
        )}

        {/* Price */}
        <span className="absolute bottom-1 right-1 text-[9px] sm:text-[12px] font-semibold bg-white/80 px-1 py-0.5 rounded-sm">
          ₹ {finalPrice?.toFixed(0)}
          {mrp > finalPrice && (
            <s className="text-red-400 text-[8px] sm:text-[12px] ml-1">
              ₹ {mrp.toFixed(0)}
            </s>
          )}
        </span>
      </div>

      {/* DETAILS */}
      <div className="px-1.5 py-1 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[11px] sm:text-[14px] font-semibold text-green-700 leading-snug line-clamp-2">
            {title}
          </h3>

          {title_hindi && (
            <span className="inline-block text-[9px] sm:text-[12px] bg-yellow-100 text-yellow-800 border px-1 py-0.5 rounded-sm mt-0.5">
              {title_hindi}
            </span>
          )}
          {/* ⭐ RATING & REVIEWS */}

          {/* SAVE + RATING ROW */}
          {(effectiveDiscount > 0 || rating) && (
            <div className="flex items-center justify-between mt-0.5">
              {/* SAVE */}
              {effectiveDiscount > 0 ? (
                <span className="text-[9px] sm:text-[12px] text-red-600 font-medium">
                  Save ₹{effectiveDiscount}
                </span>
              ) : (
                <span /> // empty placeholder to keep spacing
              )}

              {/* ⭐ RATING */}
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-0.5 bg-green-600 text-white
                   text-[9px] sm:text-[11px] px-1 py-[1px] rounded">
                  {safeRating.toFixed(1)} ★
                </span>

                {safeReviewsCount > 0 && (
                  <span className="text-gray-500 text-[9px] sm:text-[11px]">
                    ({safeReviewsCount?.toLocaleString()})
                  </span>
                )}
              </div>

            </div>
          )}

        </div>

        {/* CART ACTIONS */}
        <div className="mt-1 flex items-center justify-between">
          {qty === 0 ? (
            <div className="flex gap-1 w-full">
              <button
                onClick={() =>
                  addToCart(
                    {
                      _id,
                      imgSrc,
                      title,
                      title_hindi,
                      weight,
                      price,
                      finalPrice,
                      finalDiscount,
                      categoryId,
                      subCategoryId,
                    },
                    1
                  )
                }
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[9px] sm:text-[12px] px-2 py-0.5 rounded-sm"
              >
                Add
              </button>

              <button
                onClick={() => navigate(`/product-details/${_id}`)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-[9px] sm:text-[12px] px-2 py-0.5 rounded-sm"
              >
                View
              </button>

            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => updateQty(_id, qty - 1)}
                className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[12px]"
              >
                –
              </button>

              <span className="text-[10px] sm:text-[12px] font-semibold">
                {qty}
              </span>

              <button
                onClick={() => updateQty(_id, qty + 1)}
                className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-[12px]"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
