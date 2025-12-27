

import { useState, useEffect } from "react";

import MyBooking from "@/components/Pages/Profile/MyBooking";
import { useApi } from "@/components/api/getApi/getApi";
import useSocket from "@/components/api/useSocket/useSocket";


function Mybooking() {
  const { socket_data } = useSocket("getAllOrders");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const params = {
    page: currentPage,
    limit: 10,
    searchTerm: searchQuery,
    isActive: selectedStatus,
  };

  useEffect(() => {
    if (socket_data?.orders) {
      setProducts(socket_data.orders);
    }
  }, [socket_data]);

  /* -------- Orders API -------- */
  useApi({
    endpoint: "users/zugaly/get-orders",
    params,
    setData: async (response) => {
      const newOrders = response?.orders || [];
      setProducts(newOrders);
      setPagination(response?.pagination);
    },
    setError: setErrorMessage,
    setLoading,
  });

  console.log("Orders Data:", products);

  return (
    <section className="bg-gradient-to-br from-green-50 to-white py-2 mb-[60px]">
      <div>
        <MyBooking orders={products} loading={loading} title="My Orders. " />
      </div>
    </section>
  );
}

// ✅ Wrap component with withAuth HOC
export default Mybooking;
