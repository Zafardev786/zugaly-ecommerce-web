import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import postApi from "@/components/api/postApi/postApi";

export default function ProductTable({
  products,
  product,
  qty,
  onUpdateQty,
  setQty,
  onRemove, // optional (parent sync ke liye)
  loading,
}) {

  /* ---------------- REMOVE FROM CART ---------------- */
  const handleRemove = async (p) => {
    const productId =
      p?._id || p?.productId?._id || p?.productId;

    if (!productId) return;

    // ✅ UI se turant hatao (parent state)
    onRemove?.(productId);

    try {
      await postApi("users/zugaly/view-card/delete-from-cart", {
        productId,
      });
    } catch (err) {
      console.error("❌ Delete cart item failed:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] border border-gray-200 text-xs sm:text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-2 py-1 border">Image</th>
            <th className="px-2 py-1 border">Name</th>
            <th className="px-2 py-1 border">Weight</th>
            <th className="px-2 py-1 border">Price</th>
            <th className="px-2 py-1 border">Qty</th>
            <th className="px-2 py-1 border">Total</th>
            <th className="px-2 py-1 border">Remove</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((p, idx) => (
            <tr key={p._id || idx} className="text-center">
              {/* Image */}
              <td className="px-2 py-1 border">
                <img
                  src={p.imgSrc?.[0] || "/placeholder.png"}
                  alt={p.title}
                  className="w-12 h-12 object-cover rounded-md mx-auto"
                />
              </td>

              {/* Name */}
              <td className="px-2 py-1 border text-left">
                <span className="font-medium text-gray-800 block truncate max-w-[160px]">
                  {p.title}
                </span>
                <span className="text-[10px] text-gray-500 block">
                  {p.title_hindi || "-"}
                </span>
              </td>

              {/* Weight */}
              <td className="px-2 py-1 border">{p.weight}</td>

              {/* Price */}
              <td className="px-2 py-1 border whitespace-nowrap">
                <span className="text-green-600 font-semibold block">
                  ₹ {p.price?.offerPrice?.toFixed(0)}
                </span>
                {p.price?.mrp && (
                  <s className="text-red-400 text-[10px] block">
                    ₹ {p.price.mrp.toFixed(0)}
                  </s>
                )}
              </td>

              {/* Qty */}
              {/* Qty */}
              <td className="px-2 py-1 border">
                <div className="flex items-center justify-center gap-1">
                  {/* ➖ MINUS */}
                  <button
                    onClick={() =>

                      onUpdateQty?.(p?._id || p?.productId?._id || p?.productId, Math.max(1, (p.quantity || 1) - 1))
                    }
                    disabled={loading || p.quantity <= 1}
                    className="w-5 h-5 border border-blue-400 rounded-full"
                  >
                    <FiMinus className="text-blue-600 text-[10px]" />
                  </button>

                  {/* QTY */}
                  <span className="w-6 text-center font-semibold">
                    {p.quantity}
                  </span>

                  {/* ➕ PLUS */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onUpdateQty?.(p?._id || p?.productId?._id || p?.productId, (p.quantity || 1) + 1);
                    }}

                    disabled={loading}
                    className="w-5 h-5 border border-blue-400 rounded-full"
                  >
                    <FiPlus className="text-blue-600 text-[10px]" />
                  </button>
                </div>
              </td>


              {/* Total */}
              <td className="px-2 py-1 border font-semibold text-green-700">
                ₹ {(p.price?.offerPrice || 0) * (p.quantity || qty)}

              </td>

              {/* Remove */}
              <td className="px-2 py-1 border">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(p);
                  }}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <FiTrash2 className="text-base" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
