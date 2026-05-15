"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
    LayoutDashboard, 
    UtensilsCrossed, 
    ShoppingBag, 
    LogOut, 
    User, 
    PlusCircle, 
    Tag, 
    ChevronRight 
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

type SidebarProps = {
    onClose?: () => void;
};

export default function ProviderSidebar({ onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Signout error", err);
        }
    };

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/provider/dashboard" },
        { name: "My Meals", icon: UtensilsCrossed, href: "/provider/my-meal" },
        { name: "Offers", icon: Tag, href: "/provider/offers" },
        { name: "Add Meal", icon: PlusCircle, href: "/provider/AddMealModal" },
        { name: "Orders", icon: ShoppingBag, href: "/provider/orders" },
        { name: "Profile", icon: User, href: "/provider/profile" },
    ];

    return (
        <aside className="flex flex-col h-full bg-white dark:bg-zinc-950 overflow-hidden">
            
            {/* Sidebar Header */}
            <div className="h-20 flex items-center px-8 border-b border-gray-100 dark:border-white/5">
                <Link href="/provider/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:rotate-[10deg] transition-all duration-300">
                        <LayoutDashboard className="text-white w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-gray-900 dark:text-white tracking-tighter leading-none">FOOD<span className="text-orange-500">HUB</span></span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Provider Central</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1.5 custom-scrollbar">
                <p className="px-4 mb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Partner Dashboard</p>
                
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            prefetch={false}
                            onClick={() => onClose?.()}
                            className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                                isActive 
                                ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20" 
                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-orange-500 dark:hover:text-white"
                            }`}
                        >
                            <div className="flex items-center gap-3.5">
                                <Icon size={20} className={`${isActive ? "text-white" : "text-gray-400 dark:text-gray-500 group-hover:text-orange-500 transition-colors"}`} />
                                <span className="text-sm font-black tracking-tight">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight size={16} className="text-white/70" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Section */}
            <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-black/10">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-3 py-4 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-white/5 font-black text-xs uppercase tracking-widest text-red-500 shadow-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition-all active:scale-95"
                >
                    <LogOut size={16} />
                    Exit Session
                </button>
            </div>

        </aside>
    );
}