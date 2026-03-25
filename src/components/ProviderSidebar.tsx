"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    UtensilsCrossed,
    ShoppingBag,
    LogOut,
    User,
} from "lucide-react";
import { authClient } from "../../auth-client";

const ProviderSidebar = ({ onClose }: { onClose?: () => void }) => {
    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.replace("/");
                    }
                }
            });
        } catch (err) {
            console.error("Signout error", err);
            localStorage.clear();
            window.location.replace("/login");
        }

        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        }
    };

    const menuItems = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            href: `/provider/dashboard`
        },
        {
            name: "My Meals",
            icon: <UtensilsCrossed size={20} />,
            href: `/provider/my-meal`
        },
        {
            name: "Orders",
            icon: <ShoppingBag size={20} />,
            href: `/provider/orders`
        },
        {
            name: "Profile",
            icon: <User size={20} />,
            href: `/provider/profile`
        },
    ];

    return (
        <aside className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50 border-r shadow-sm">

            {/* Top */}
            <div className="p-5 border-b">
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                    Provider Panel
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                    Manage your meals 🍽
                </p>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose} // 🔥 important
                        className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 hover:text-gray-900 transition-all duration-300"
                    >
                        <span className="text-gray-500 group-hover:text-orange-500 transition">
                            {item.icon}
                        </span>

                        <span className="font-medium">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default ProviderSidebar;