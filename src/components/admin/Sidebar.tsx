// components/admin/Sidebar.tsx
"use client"
import Link from "next/link";
import { adminMenu } from "@/config/adminMenu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";



export default function Sidebar() {
    const router = useRouter();


    const handleLogout = () => {



        // ১. ব্রাউজার থেকে কুকি বা টোকেন ডিলিট করা
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // ২. লোকাল স্টোরেজ ক্লিয়ার করা (যদি থাকে)
        localStorage.removeItem("user");

        // ৩. ইউজারকে লগইন পেজে পাঠিয়ে দেওয়া
        router.push("/login");

        // ৪. পেজ রিফ্রেশ করা যাতে সব স্টেট রিসেট হয়
        router.refresh();
    };

    return (
        <aside className="fixed p-4 pr-4 inset-y-0 left-0 w-96 bg-blue-300 text-black p-6 flex flex-col z-[50] border-r border-gray-800">
            <h1 className="text-3xl mb-2  font-bold mb-8 text-black">Admin Panel</h1>

            <nav className="space-y-2 flex-1 overflow-y-auto">


                {adminMenu?.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition"
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-5 border-t border-gray-800">
                <button onClick={handleLogout} className=" flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-red-500/20 text-red-400 transition">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}