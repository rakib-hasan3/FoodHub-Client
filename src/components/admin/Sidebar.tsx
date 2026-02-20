// components/admin/Sidebar.tsx
"use client"
import Link from "next/link";
import { adminMenu } from "@/config/adminMenu";
import { LogOut } from "lucide-react";

export default function Sidebar() {

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        localStorage.removeItem("user");
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <aside className="fixed p-4 pr-4 inset-y-0 left-0 w-96 bg-blue-300 text-black flex flex-col z-[50] border-r border-gray-800">
            <h1 className="text-3xl mb-8 font-bold text-black">Admin Panel</h1>

            <nav className="space-y-2 flex-1 overflow-y-auto">
                {adminMenu?.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20 text-gray-800 hover:text-black transition"
                        >
                            <Icon size={18} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-5 border-t border-gray-500/30">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-red-500/20 text-red-600 font-bold transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}