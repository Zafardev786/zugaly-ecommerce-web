import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaClipboardList, FaUserCircle, FaMicrophone, FaShoppingCart } from "react-icons/fa";

// 自定义 Hook 示例（你需要根据实际情况调整）
const useSocket = (eventName) => {
  // 这里模拟 socket 数据，实际项目中请使用真正的 socket 连接
  const [socketData, setSocketData] = useState(null);
  
  useEffect(() => {
    // 模拟 socket 连接和数据获取
    const mockSocketData = () => {
      if (eventName === "get-cart-length") {
        // 模拟从服务器获取购物车数量
        const mockCartLength = Math.floor(Math.random() * 10);
        setSocketData(mockCartLength);
      }
    };
    
    mockSocketData();
    
    // 清理函数
    return () => {
      // 清理 socket 连接
    };
  }, [eventName]);
  
  return { socket_data: socketData };
};

// API Hook 示例（你需要根据实际情况调整）
const useApi = ({ endpoint, params, setData, setError, setLoading }) => {
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 模拟 API 调用
        const response = await fetch(`/api/${endpoint}?${new URLSearchParams(params)}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [endpoint, params]);
};

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState(0);
  
  const { socket_data } = useSocket("get-cart-length");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleNav = (path) => {
    setActivePath(path);
    navigate(path);
  };

  const params = {
    page: currentPage,
    limit: 100,
    searchTerm: searchQuery,
  };

  useEffect(() => {
    if (socket_data !== null && socket_data !== undefined) {
      setCartData(socket_data);
    }
  }, [socket_data]);

  // 使用 API Hook 获取购物车数量
  useApi({
    endpoint: "users/zugaly/view-card/cart/length",
    params,
    setData: (response) => {
      setCartData(response?.totalLength || 0);
    },
    setError: () => { },
    setLoading,
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-lg border-t-2 z-[1000] min-[982px]:hidden">
      <div className="flex justify-between items-center px-2 py-1 relative">
        {/* Left side icons */}
        <div className="flex gap-2">
          <button
            type="button"
            className={`flex flex-col items-center w-[60px] p-1 rounded-lg transition-all ${
              activePath === "/profile-section/"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => handleNav("/")}
            aria-label="Home"
          >
            <FaHome size={18} />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            type="button"
            className={`flex flex-col items-center w-[60px] p-1 rounded-lg transition-all ${
              activePath === "/profile-section/my-bookings"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => handleNav("/profile-section/my-bookings")}
            aria-label="Bookings"
          >
            <FaClipboardList size={18} />
            <span className="text-[10px] text-center">Booking</span>
          </button>
        </div>

        {/* Center microphone button */}
        <button
          type="button"
          onClick={() => navigate("/search")}
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Search with microphone"
        >
          <FaMicrophone size={22} />
        </button>

        {/* Right side icons */}
        <div className="flex gap-2">
          <button
            type="button"
            className="relative flex flex-col items-center w-[60px] p-1 rounded-lg transition-all text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => navigate("/cart")}
            aria-label="Shopping Cart"
          >
            <FaShoppingCart size={18} />
            <span className="text-[10px]">Cart</span>

            {/* Cart badge */}
            {cartData > 0 && (
              <span 
                className="absolute -top-1 -right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-6 h-4 flex items-center justify-center animate-pulse"
                aria-label={`${cartData} items in cart`}
              >
                {cartData}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`flex flex-col items-center w-[60px] p-1 rounded-lg transition-all ${
              activePath === "/profile-section/profile-view"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => handleNav("/profile")}
            aria-label="Profile"
          >
            <FaUserCircle size={18} />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;