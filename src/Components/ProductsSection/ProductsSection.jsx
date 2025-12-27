import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Chips from "../Header/Category";
import { useApi } from "../api/getApi/getApi";
import ProductSkeleton from "../ProductCard/ProductSkeleton";
import CartSummary from "../ProductCard/CartSummary";
import useSocket from "../api/useSocket/useSocket";

export default function ProductsSection() {
  /* ================= STATES ================= */
  const [products, setProducts] = useState([]);

  const [subCategories, setSubCategories] = useState([
    { key: "all", name: "सभी", icon: "" },
  ]);
  const [subCatIndex, setSubCatIndex] = useState(0);

  const [weights, setWeights] = useState(["all"]);
  const [wtIndex, setWtIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= SOCKET ================= */
  const { socket_data } = useSocket("getProducts");

  useEffect(() => {
    if (socket_data?.data) {
      setProducts(socket_data.data);
    }
  }, [socket_data]);

  console.log("socket_datasocket_data",socket_data)

  /* ================= PRODUCTS API ================= */
  const params = {
    page: currentPage,
    limit: 20,
    searchTerm: searchQuery,
    isActive: selectedStatus,
  };

  const sellerToken =
    typeof window !== "undefined"
      ? localStorage.getItem("seller-token")
      : null;

  const userToken =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  const hasToken = sellerToken || userToken;

  const productEndpoint = hasToken
    ? "admin/zugaly/products/get-products-user"
    : "admin/zugaly/products/get-products-user-without-token";

  useApi({
    endpoint: productEndpoint,
    params,
    setData: (res) => {
      const list = res?.data || [];
      setProducts(list);
      setPagination(res?.pagination || null);

      /* weights */
      setWeights(["all", ...new Set(list.map((p) => p.weight))]);
    },
    setError: setErrorMessage,
    setLoading,
  });

  /* ================= SUB-CATEGORY API ================= */
  useApi({
    endpoint: "admin/zugaly/get-sub-category-customers",
    setData: (res) => {
      const list = res?.data || [];

      setSubCategories([
        { key: "all", name: "सभी" },
        ...list.map((s) => ({
          key: s._id, // ✅ ONLY ID
          name: s.subcategoryname_hindi || s.subcategoryname, // ✅ LABEL
          icon: s.icon, // ✅ IMAGE ARRAY
          categoryId: s.categoryId?._id,
        })),
      ]);
    },
  });


  /* ================= ACTIVE FILTERS ================= */
  const activeSubCategory = subCategories[subCatIndex];
  const activeWeight = weights[wtIndex];

  /* ================= FILTER PRODUCTS ================= */
  const filteredProducts = products.filter((p) => {
    const subCategoryMatch =
      activeSubCategory?.key === "all" ||
      p.subCategoryId === activeSubCategory?.key;

    const weightMatch =
      activeWeight === "all" || p.weight === activeWeight;

    return subCategoryMatch && weightMatch;
  });


  console.log("subCategoriessubCategories", subCategories)
  /* ================= UI ================= */
  return (
    <section className="bg-gradient-to-br from-green-50 to-white py-2 mb-[60px]">

      {/* SubCategory Chips */}
      <Chips
        items={subCategories}
        selected={subCatIndex}
        setSelected={setSubCatIndex}
        color="bg-green-600 border-green-700"
      />

      {/* Weight Chips */}
      <Chips
        items={weights}
        selected={wtIndex}
        setSelected={setWtIndex}
        color="bg-orange-500 border-orange-600"
      />

      {/* Product Grid */}
      <div className="px-2 pt-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))
        ) : filteredProducts?.length > 0 ? (
          filteredProducts?.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-14 text-center">

            {/* Animated Icon */}
            <div className="relative mb-4">
              <span className="text-5xl animate-bounce">🛒</span>
              <span className="absolute -top-1 -right-2 text-xl animate-ping">✨</span>
            </div>

            {/* Main Text */}
            <h3 className="text-lg font-semibold text-gray-700">
              Abhi yahan products available nahi hain
            </h3>

            {/* Sub Text */}
            <p className="text-sm text-gray-500 mt-1 max-w-xs">
              Aapke liye naye aur fresh products bahut jald add kiye ja rahe hain
            </p>

            {/* Coming Soon Badge */}
            <div className="mt-4 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold animate-pulse">
              🚀 Coming Soon
            </div>

            {/* Decorative Icons */}
            <div className="flex gap-4 mt-6 text-2xl opacity-70">
              <span className="animate-float">🌶️</span>
              <span className="animate-float delay-200">🌾</span>
              <span className="animate-float delay-500">🥜</span>
            </div>
          </div>

        )}
      </div>

      {/* Cart */}
      <CartSummary />
    </section>
  );
}
