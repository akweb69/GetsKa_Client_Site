import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MdDashboard,
    MdShoppingCart,
    MdHistory,
    MdFavorite,
    MdPerson,
    MdSettings,
    MdLogout,
    MdMenu,
    MdClose
} from "react-icons/md";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logoImage from "../assets/Getska-design-Logo-Color-Variation-green-without-BG.png";
import { useAuth } from '../Context/AuthContext';
import { LuUser } from "react-icons/lu";
import toast from 'react-hot-toast';


const UserDashLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    // check and load user-->
    const { userLoading, user, logout } = useAuth();

    const asideBarItems = [
        { title: "Dashboard", link: "/user", icon: <MdDashboard size={22} /> },
        { title: "Orders", link: "/user/orders", icon: <MdShoppingCart size={22} /> },
        { title: "Order History", link: "/user/history", icon: <MdHistory size={22} /> },
        { title: "Wishlist", link: "/user/wishlist", icon: <MdFavorite size={22} /> },
        { title: "Profile", link: "/user/profile", icon: <MdPerson size={22} /> },
        { title: "Settings", link: "/user/settings", icon: <MdSettings size={22} /> },
    ];

    // handle logout and redirect to login page
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login');
        toast.success("Logout successful!");
    };

    const isActive = (link) => location.pathname === link;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isCollapsed && window.innerWidth >= 1024 ? 80 : 280,
                }}
                className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-xl lg:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >

                {/* Logo / Header */}
                <div className="h-16 border-b border-gray-200 flex items-center px-6">
                    <div className="flex items-center gap-3">
                        <img className='max-h-12 w-full' src={logoImage} alt="" />

                    </div>

                    {/* Collapse button (desktop only) */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="ml-auto hidden lg:block text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {isCollapsed ? '→' : '←'}
                    </button>

                    {/* Close button for mobile */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="ml-auto lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <MdClose size={26} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                    <ul className="space-y-1">
                        {asideBarItems.map((item, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    to={item.link}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[15px] font-medium transition-all group ${isActive(item.link)
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <span className={`${isActive(item.link) ? 'text-white' : 'text-gray-500 group-hover:text-purple-600'}`}>
                                        {item.icon}
                                    </span>
                                    <motion.span
                                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                                        className="truncate"
                                    >
                                        {item.title}
                                    </motion.span>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Section - Logout */}
                <div
                    onClick={() => handleLogout()}
                    className="border-t border-gray-200 p-6">
                    <button className="flex items-center gap-4 w-full px-5 py-3.5 text-red-600 hover:bg-red-50 rounded-2xl transition-colors text-[15px] font-medium">
                        <MdLogout size={22} />
                        <motion.span
                            animate={{ opacity: isCollapsed ? 0 : 1 }}
                        >
                            Logout
                        </motion.span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden text-gray-700 hover:text-black p-2 -ml-2 rounded-xl transition-colors"
                        >
                            <MdMenu size={28} />
                        </button>

                        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
                            Welcome back, {userLoading ? <span className="animate-pulse">...</span> : user?.displayName}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center font-medium text-lg">
                            {
                                userLoading ? <div className="w-10 h-10 flex items-center justify-center rounded-full animate-pulse">
                                    <LuUser className='w-full' />
                                </div> : <div className="w-10 h-10 flex items-center justify-center rounded-full">
                                    {user?.photoURL ? <img className='w-full h-full rounded-full' src={user?.photoURL} alt="" /> : <LuUser className='w-full' />}
                                </div>
                            }
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6 lg:p-10 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserDashLayout;