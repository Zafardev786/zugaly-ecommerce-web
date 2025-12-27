import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaSignOutAlt,
    FaUpload,
    FaBars,
    FaTimes,
    FaUserCircle,
    FaClipboardList,
    FaHistory,
    FaMapMarkerAlt,
    FaCrown,
    FaWallet,
    FaBell,
    FaHeadset,
    FaCog,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

// 假设的adminRoutes数据，你需要根据实际情况调整
const adminRoutes = [
    { _id: 1, routesname: "Dashboard", redirect_path: "/dashboard" },
    { _id: 2, routesname: "My Bookings", redirect_path: "/bookings" },
    { _id: 3, routesname: "Booking History", redirect_path: "/history" },
    { _id: 4, routesname: "Profile Setting", redirect_path: "/profile" },
    { _id: 5, routesname: "Update Address", redirect_path: "/address" },
    { _id: 6, routesname: "Membership & Rewards", redirect_path: "/membership" },
    { _id: 7, routesname: "My Wallet", redirect_path: "/wallet" },
    { _id: 8, routesname: "Notifications", redirect_path: "/notifications" },
    { _id: 9, routesname: "Customer Support", redirect_path: "/support" },
    { _id: 10, routesname: "Profile Settings", redirect_path: "/settings" },
];

// Icon mapping + colors
const iconMapper = {
    "Dashboard": { icon: MdDashboard, color: "text-blue-500" },
    "My Bookings": { icon: FaClipboardList, color: "text-purple-500" },
    "Booking History": { icon: FaHistory, color: "text-green-500" },
    "Profile Setting": { icon: FaUserCircle, color: "text-gray-600" },
    "Update Address": { icon: FaMapMarkerAlt, color: "text-orange-500" },
    "Membership & Rewards": { icon: FaCrown, color: "text-yellow-500" },
    "My Wallet": { icon: FaWallet, color: "text-emerald-500" },
    "Notifications": { icon: FaBell, color: "text-pink-500" },
    "Customer Support": { icon: FaHeadset, color: "text-purple-700" },
    "Profile Settings": { icon: FaCog, color: "text-gray-700" },
};

const Sidebar = () => {
    const routes = adminRoutes;
    const [loading, setLoading] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const [notification, setNotification] = useState({
        isVisible: false,
        message: "",
        type: "",
    });

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    };

    // 显示通知
    const showNotification = (message, type = "success") => {
        setNotification({
            isVisible: true,
            message,
            type,
        });
        setTimeout(() => {
            setNotification({
                isVisible: false,
                message: "",
                type: "",
            });
        }, 3000);
    };

    // 处理图片上传
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        // 这里添加你的图片上传逻辑
        setTimeout(() => {
            setLoading(false);
            showNotification("图片上传成功！", "success");
        }, 1000);
    };

    return (
        <>
            <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                <button 
                    onClick={toggleSidebar} 
                    className="toggle-btn"
                    aria-label={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
                >
                    {isCollapsed ? <FaBars /> : <FaTimes />}
                </button>

                {/* User Info */}
                <div className="user-info">
                    {!isCollapsed && (
                        <>
                            <div className="relative">
                                <img
                                    src="/edooqate_logo.jpeg"
                                    alt="profile image"
                                    className="w-52 h-12 rounded object-cover"
                                />
                                <label htmlFor="image-upload" className="upload-icon cursor-pointer">
                                    {loading ? (
                                        <p className="text-sm">上传中...</p>
                                    ) : (
                                        <FaUpload className="nav-link-icon text-gray-600" />
                                    )}
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        disabled={loading}
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>
                            <span className="info-name">用户名称</span>
                        </>
                    )}
                </div>

                {/* Navigation */}
                <nav className="navigation">
                    <ul className="nav-list">
                        {routes?.map((route) => {
                            const { icon: IconComponent, color } =
                                iconMapper[route.routesname] || {};
                            const isActive = location.pathname?.startsWith(route.redirect_path);

                            return (
                                <li className="nav-item" key={route._id}>
                                    <a
                                        href={route.redirect_path}
                                        className={`nav-link ${isActive ? "active" : ""}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(route.redirect_path);
                                        }}
                                    >
                                        {IconComponent && (
                                            <IconComponent className={`nav-link-icon ${color} text-lg`} />
                                        )}
                                        {!isCollapsed && (
                                            <span className="nav-link-text">{route.routesname}</span>
                                        )}
                                    </a>
                                </li>
                            );
                        })}

                        <li className="nav-item">
                            <button 
                                className="nav-link logout-link"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt className="nav-link-icon text-red-500 text-lg" />
                                {!isCollapsed && <span className="nav-link-text">退出登录</span>}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Notification */}
            {notification.isVisible && (
                <div
                    className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg z-50 ${
                        notification.type === "success"
                            ? "bg-green-500"
                            : "bg-red-500"
                    } text-white transition-opacity duration-300`}
                >
                    {notification.message}
                </div>
            )}
        </>
    );
};

export default Sidebar;