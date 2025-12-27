import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useApi } from "../api/getApi/getApi";
import ProductSkeleton from "../ProductCard/ProductSkeleton";
import CartSummary from "../ProductCard/CartSummary";
import useSocket from "../api/useSocket/useSocket";

export default function ViewProduct() {
  const [viewProducts, setViewProducts] = useState({
    recentData: [],
    recommendationData: [],
    favrateData: [],
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  /* ---------------- Socket Integration ---------------- */
  const { socket_data } = useSocket("get-view-products");

  useEffect(() => {
    if (socket_data) {
      setViewProducts(socket_data);
    }
  }, [socket_data]);

  /* ---------------- API Call ---------------- */
  useApi({
    endpoint: "users/zugaly/view-products/get-view-products",
    params: { page: 1, limit: 100 },
    setData: (response) => {
      setViewProducts(
        response || {
          recentData: [],
          recommendationData: [],
          favrateData: [],
        }
      );
    },
    setError: setErrorMessage,
    setLoading,
  });

  /* ---------------- Helpers ---------------- */

  // Group products by subCategory / category
  const groupBySubCategory = (items = []) => {
    return items.reduce((acc, product) => {
      const key =
        product.subCategoryId?._id ||
        product.categoryId?._id ||
        "uncategorized";

      if (!acc[key]) {
        acc[key] = {
          id: key,
          title:
            product.subCategoryId?.subcategoryname ||
            product.categoryId?.categoryname ||
            "Other",
          items: [],
        };
      }

      acc[key].items.push(product);
      return acc;
    }, {});
  };

  // Render section safely
  const renderSection = (title, items = []) => {
    if (!items.length) return null;

    const grouped = groupBySubCategory(items);

    return (
      <section className="mb-4">
        <h2 className="text-lg font-bold text-green-700 mb-2 px-2">
          {title}
        </h2>

        {Object.values(grouped).map((cat) => (
          <div key={cat.id} className="mb-3">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide px-2 pb-2">
              {cat.items.map((p) => (
                <div
                  key={p._id}
                  className="min-w-[130px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] flex-shrink-0"
                >
                  <ProductCard
                    _id={p._id}
                    categoryId={p.categoryId}
                    subCategoryId={p.subCategoryId}
                    quantity={p.quantity}
                    weight={p.weight}
                    {...(p.productId || p)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  };

  /* ---------------- Render ---------------- */
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      {renderSection("Recommendation", viewProducts.recommendationData)}
      {renderSection("Recent", viewProducts.recentData)}
      {renderSection("Favourite", viewProducts.favrateData)}

      {/* Bottom Cart Summary */}
      <CartSummary />
    </>
  );
}
