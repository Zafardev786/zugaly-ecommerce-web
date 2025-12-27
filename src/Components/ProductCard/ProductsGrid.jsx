"use client";
import ProductCard from "@/components/ProductCard/ProductCard";


/* हिन्दी प्रोडक्ट‑लिस्ट — कीमत सहित */
const products = [
  {
    imgSrc: "/banner-zugaly.png",
    title: "हल्दी पाउडर",
    weight: "100 ग्राम",
    price: 45,          // ₹ 45
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 100g",
    packSize: "100g",
    isoLogo: "/iso-logo.png",
  },
  {
    imgSrc: "/banner-zugaly.png",
    title: "लाल मिर्च पाउडर",
    weight: "200 ग्राम",
    price: 90,
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 200g",
    packSize: "200g",
    isoLogo: "/iso-logo.png",
  },
  {
    imgSrc: "/banner-zugaly.png",
    title: "धनिया पाउडर",
    weight: "100 ग्राम",
    price: 40,
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 100g",
    packSize: "100g",
    isoLogo: "/iso-logo.png",
  },
  {
    imgSrc: "/banner-zugaly.png",
    title: "जीरा पाउडर",
    weight: "100 ग्राम",
    price: 70,
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 100g",
    packSize: "100g",
    isoLogo: "/iso-logo.png",
  },
  {
    imgSrc: "/banner-zugaly.png",
    title: "काली मिर्च पाउडर",
    weight: "50 ग्राम",
    price: 80,
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 50g",
    packSize: "50g",
    isoLogo: "/iso-logo.png",
  },
  {
    imgSrc: "/banner-zugaly.png",
    title: "गरम मसाला",
    weight: "100 ग्राम",
    price: 95,
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 100g",
    packSize: "100g",
    isoLogo: "/iso-logo.png",
  },
  {
    imgSrc: "/banner-zugaly.png",
    title: "इलायची",
    weight: "25 ग्राम",
    price: 120,
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 25g",
    packSize: "25g",
    isoLogo: "/iso-logo.png",
  },
  {
    imgSrc: "/banner-zugaly.png",
    title: "सरसों के दाने",
    weight: "200 ग्राम",
    price: 55,
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 200g",
    packSize: "200g",
    isoLogo: "/iso-logo.png",
  },
  {
    imgSrc: "/banner-zugaly.png",
    title: "मेथी दाना",
    weight: "150 ग्राम",
    price: 38,
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 150g",
    packSize: "150g",
    isoLogo: "/iso-logo.png",
  },
  {
    imgSrc: "/banner-zugaly.png",
    title: "लौंग",
    weight: "50 ग्राम",
    price: 110,
    purity: "100% शुद्धता की गारंटी",
    netWeight: "कुल वजन: 50g",
    packSize: "50g",
    isoLogo: "/iso-logo.png",
  },
];




export default function ProductsGrid() {
  return (
    <div className="flex-1 bg-gradient-to-br from-green-50 to-white py-2 px-4 fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">
        Our Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>

      {/* ---------- same style block added here ---------- */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 1.2s ease-in;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
