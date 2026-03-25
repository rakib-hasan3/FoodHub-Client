"use client"
import Link from "next/link";
import { adminMenu } from "@/config/adminMenu";
import { LogOut } from "lucide-react";
import { authClient } from "../../../auth-client";

type SidebarProps = {
    onClose?: () => void;
};

export default function Sidebar({ onClose }: SidebarProps) {

    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.replace("/login");
                    }
                }
            });
        } catch (err) {
            console.error("Signout error", err);
            localStorage.clear();
            window.location.replace("/");
        }

        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        }
    };

    return (
        <aside className="flex flex-col justify-between h-full w-64 bg-white p-4 text-black">

            <div>
                <h1 className="mb-8 text-2xl font-bold text-gray-900">Admin Panel</h1>

                <nav className="space-y-2">
                    {adminMenu?.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch={false}
                                onClick={() => onClose?.()} // 🔥 FIX
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-black"
                            >
                                <Icon size={18} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-gray-200 pt-5">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 font-bold text-red-600 hover:bg-red-50"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

        </aside>
    );
}