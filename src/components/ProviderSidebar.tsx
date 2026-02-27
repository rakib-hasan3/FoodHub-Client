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
import { authClient } from "../../auth-client";

const ProviderSidebar = () => {
    const providerId =
        typeof window !== "undefined"
            ? localStorage.getItem("providerId")
            : null;


    const handleLogout = async () => {
        try {
            // ১. Better Auth-এর মাধ্যমে সেশন শেষ করা
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        // ২. সেশন সাকসেসফুলি শেষ হলে সবকিছু ক্লিয়ার করা
                        localStorage.clear();
                        sessionStorage.clear();

                        // ৩. লুপ বন্ধ করতে সরাসরি হার্ড রিডাইরেক্ট
                        window.location.replace("/");
                    }
                }
            });
        } catch (err) {
            console.error("Signout error", err);
            // যদি এরর আসে, তবুও জোর করে বের করে দাও
            localStorage.clear();
            window.location.replace("/login");
        }

        // ৪. মেমোরিতে থাকা কুকি ডিলিট করার ব্যাকআপ লুপ
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
            name: "Settings",
            icon: <Settings size={20} />,
            href: providerId
                ? `/provider/settings/${providerId}`
                : "#",
        },
    ];

    return (
        <div className="w-60 bg-white h-screen shadow-md flex flex-col">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold text-primary">
                    Provider Panel
                </h1>
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