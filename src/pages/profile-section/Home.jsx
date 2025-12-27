
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import Navbar from "@/components/Header/Navbar";

export default function HomePage() {
  return (
    <>

      <div className="min-h-screen flex flex-col px-2">
        <Navbar/>
        <ProductsSection />
  
      </div>
    </>
  );
}
