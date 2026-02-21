"use client"
import Link from "next/link";
import { adminMenu } from "@/config/adminMenu";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Sidebar() {

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
                        window.location.replace("/login");
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
                            // prefetch={false} যোগ করা হয়েছে যাতে অটো-রিলোড লুপ না হয়
                            prefetch={false}
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