"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    UtensilsCrossed,
    ShoppingBag,
    Settings,
    LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

const ProviderSidebar = () => {

    const providerId =
        typeof window !== "undefined"
            ? localStorage.getItem("providerId")
            : null;

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.clear();
        toast.success("Logged out successfully");
        window.location.href = "/";
    };

    const menuItems = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            href: providerId ? `/provider/dashboard/${providerId}` : "#",
        },
        {
            name: "My Meals",
            icon: <UtensilsCrossed size={20} />,
            href: providerId ? `/provider/my-meals/${providerId}` : "#",
        },
        {
            name: "Orders",
            icon: <ShoppingBag size={20} />,
            href: providerId ? `/provider/orders/${providerId}` : "#",
        },
        {
            name: "Settings",
            icon: <Settings size={20} />,
            href: providerId ? `/provider/settings/${providerId}` : "#",
        },
    ];

    return (
        <div className="w-60 bg-white h-screen shadow-md flex flex-col">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold text-primary">Provider Panel</h1>
            </div>

            <nav className="flex-grow p-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 p-3 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg mb-2 transition"
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 w-full rounded-lg transition"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default ProviderSidebar;