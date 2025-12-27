"use client";

import { useState } from "react";
import MyBooking from "@/components/Pages/Profile/BookingHistory";
import { useApi } from "@/components/api/getApi/getApi";
import ProductSkeleton from "@/components/ProductCard/ProductSkeleton";


const BookingHistory = () => {
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
    status: "Delivered"

  };

  /* -------- Orders API -------- */
  useApi({
    endpoint: "users/zugaly/get-orders-history",
    params,
    setData: async (response) => {
      const newOrders = response?.orders || [];
      setProducts(newOrders);
      setPagination(response?.pagination);

    },
    setError: setErrorMessage,
    setLoading,
  });
  console.log("OrdersOrdersOrdersOrdersOrdersOrdersOrders Data:", products);

  return (
    <section className="bg-gradient-to-br from-green-50 to-white py-2 mb-[60px]">


      <div className="">
        < MyBooking orders={products} title="Booking History"/>
      </div>


    </section>
  );
}


export default BookingHistory;