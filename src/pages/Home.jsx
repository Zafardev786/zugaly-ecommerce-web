import { useEffect, useState } from "react";
import Banner from "../components/Header/Banner";
import ProductsSection from "../components/ProductsSection/ProductsSection";
import useSocket from "../components/api/useSocket/useSocket";
import usePageTitle from "@/hooks/usePageTitle";

export default function HomePage() {
  const { socket_data } = useSocket("get-cart-length");
  const [cartData, setCartData] = useState(null);
    usePageTitle("Zugaly – Fresh Groceries & Crops");

  useEffect(() => {
    if (socket_data?.data) {
      setCartData(socket_data.data);
    }
  }, [socket_data]);

  return (
    <div className="min-h-screen flex flex-col px-2">
      <Banner addtocart={cartData} />
      <ProductsSection />
    </div>
  );
}
