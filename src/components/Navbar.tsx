"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { 
    ShoppingCart, User, Menu, X, Sun, Moon, LayoutDashboard, Settings, 
    Package, LogOut, Pizza, Beef, Fish, IceCream, UtensilsCrossed,
    Home, Utensils, Tag, Grid, Flame, Store, ChevronRight
} from "lucide-react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user: session, loading: isPending, logout } = useAuth();
    const { cartItems } = useCart();
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                const result = await res.json();
                if (result.success) {
                    setCategories(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);


    const handleLogout = async () => {
        await logout();
    };

    const itemCount = mounted ? cartItems.length : 0;

    return (
        <nav className="sticky top-0 w-full z-[100] bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
            <div className="relative mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex-1 flex items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 bg-orange-500 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:rotate-[15deg] transition-all duration-500 border-2 border-white/20">
                            <span className="text-xl font-black text-white italic tracking-tighter">F</span>
                        </div>
                        <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">Food<span className="text-orange-500">Hub</span></span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-none items-center justify-center gap-8">
                    {[
                        { name: "Home", href: "/" },
                        { name: "Meals", href: "/meals" },
                        { name: "Offers", href: "/offers" },
                        { name: "Categories", href: "/categories" },
                        ...(session ? [
                            { name: "Trending", href: "/trending" },
                            { name: "Restaurants", href: "/restaurants" },
                        ] : [])
                    ].map((link) => {
                        if (link.name === "Categories") {
                            const isActive = pathname === "/categories";
                            return (
                                <Link
                                    key={link.name}
                                    href="/categories"
                                    className={`text-sm font-bold transition-all relative group ${isActive
                                        ? "text-orange-500"
                                        : "text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${isActive ? "w-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" : "w-0 group-hover:w-full"
                                        }`} />
                                    {isActive && (
                                        <span className="absolute -top-1 -right-1.5 w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                                    )}
                                </Link>
                            );
                        }
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold transition-all relative group ${isActive
                                    ? "text-orange-500"
                                    : "text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${isActive ? "w-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" : "w-0 group-hover:w-full"
                                    }`} />
                                {isActive && (
                                    <span className="absolute -top-1 -right-1.5 w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Action Section */}
                <div className="flex-1 flex items-center justify-end gap-4">

                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className={`p-2 w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all duration-300 ${session ? "hidden sm:flex" : "flex"}`}
                    >
                        {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
                    </button>

                    {session && (
                        <Link href="/cart" className="relative group p-2">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                                <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
                            </div>
                            {mounted && itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-[11px] font-black text-white shadow-lg shadow-orange-500/30 border-4 border-white dark:border-black">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    )}

                    <div className="hidden md:flex items-center min-w-[140px] justify-end">
                        {isPending ? (
                            <div className="w-10 h-10 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse" />
                        ) : session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-3 p-1.5 pl-4 rounded-3xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
                                        <span className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">{session.name?.split(' ')[0]}</span>
                                        <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/20">
                                            <User className="w-5 h-5" />
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-72 p-2 rounded-[1.5rem] border border-gray-100 dark:border-white/5 shadow-2xl bg-white dark:bg-zinc-900">
                                    {/* User Info Header */}
                                    <div className="flex items-center gap-3 px-4 py-4 mb-1 border-b border-gray-100 dark:border-white/5">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20 flex-shrink-0">
                                            {session.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-black text-gray-900 dark:text-white truncate">{session.name}</p>
                                            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 truncate">{session.email}</p>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="space-y-0.5 py-1">
                                        <DropdownMenuItem
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold cursor-pointer text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-500 transition-colors"
                                            onClick={() => router.push("/profile")}
                                        >
                                            <LayoutDashboard size={17} />
                                            <span>Dashboard</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold cursor-pointer text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-500 transition-colors"
                                            onClick={() => router.push("/my-orders")}
                                        >
                                            <Package size={17} />
                                            <span>My Orders</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold cursor-pointer text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-500 transition-colors"
                                            onClick={() => router.push("/profile/edit")}
                                        >
                                            <Settings size={17} />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                    </div>

                                    <div className="h-px bg-gray-100 dark:bg-white/5 my-1" />

                                    <DropdownMenuItem
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 focus:bg-red-50 dark:focus:bg-red-500/10 focus:text-red-500 transition-colors"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={17} />
                                        <span>Sign Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login">
                                    <button className="px-6 py-3 text-sm font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">Login</button>
                                </Link>
                                <Link href="/signup">
                                    <button className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">Join Now</button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button - Using Sheet for industry standard drawer */}
                    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                        <SheetTrigger asChild>
                            <button
                                className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex-shrink-0 hover:bg-orange-500 hover:text-white transition-all duration-300"
                            >
                                <Menu size={20} />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="p-0 w-[80%] sm:max-w-sm border-l border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-950 flex flex-col" showCloseButton={false}>
                            {/* Drawer Header */}
                            <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-950 sticky top-0 z-10">
                                <SheetTitle asChild>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-orange-500/20">
                                            F
                                        </div>
                                        <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">Food<span className="text-orange-500">Hub</span></span>
                                    </div>
                                </SheetTitle>
                                <button 
                                    onClick={() => setMenuOpen(false)} 
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto custom-scrollbar">
                                {/* User Profile Summary in Drawer (if logged in) */}
                                {session && (
                                    <div className="p-6 bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
                                                {session.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-black text-lg text-gray-900 dark:text-white truncate">{session.name}</p>
                                                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 truncate">{session.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Links Group */}
                                <div className="p-4 space-y-1">
                                    <p className="px-4 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Menu Navigation</p>
                                    {[
                                        { name: "Home", href: "/", icon: Home },
                                        { name: "Meals", href: "/meals", icon: Utensils },
                                        { name: "Offers", href: "/offers", icon: Tag },
                                        { name: "Categories", href: "/categories", icon: Grid },
                                        ...(session ? [
                                            { name: "Trending", href: "/trending", icon: Flame },
                                            { name: "Restaurants", href: "/restaurants", icon: Store },
                                        ] : [])
                                    ].map((link) => {
                                        const Icon = link.icon;
                                        const isActive = pathname === link.href;
                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setMenuOpen(false)}
                                                className={`group flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${
                                                    isActive 
                                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-orange-500"
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Icon size={20} className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-orange-500"} transition-colors`} />
                                                    <span className="text-base font-bold tracking-tight">{link.name}</span>
                                                </div>
                                                {isActive && <ChevronRight size={16} className="text-white/70" />}
                                            </Link>
                                        );
                                    })}
                                </div>

                                {session && (
                                    <div className="p-4 space-y-1 border-t border-gray-100 dark:border-white/5">
                                        <p className="px-4 py-3 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Account Settings</p>
                                        <Link 
                                            href="/profile" 
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-orange-500 transition-all"
                                        >
                                            <LayoutDashboard size={20} />
                                            <span className="text-base font-bold">Dashboard</span>
                                        </Link>
                                        <Link 
                                            href="/my-orders" 
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-orange-500 transition-all"
                                        >
                                            <Package size={20} />
                                            <span className="text-base font-bold">My Orders</span>
                                        </Link>
                                        <Link 
                                            href="/profile/edit" 
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-orange-500 transition-all"
                                        >
                                            <Settings size={20} />
                                            <span className="text-base font-bold">Settings</span>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 mt-auto">
                                <div className="flex items-center justify-between mb-6 px-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Theme Preference</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white capitalize">{mounted ? theme : ""} Mode</span>
                                    </div>
                                    <button
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                        className="w-12 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-all shadow-sm"
                                    >
                                        {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
                                    </button>
                                </div>

                                {session ? (
                                    <button
                                        onClick={() => { handleLogout(); setMenuOpen(false); }}
                                        className="w-full py-4 bg-white dark:bg-zinc-800 border border-red-100 dark:border-red-500/10 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition-all flex items-center justify-center gap-3"
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center py-4 bg-gray-100 dark:bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                                            Login
                                        </Link>
                                        <Link href="/signup" onClick={() => setMenuOpen(false)} className="flex items-center justify-center py-4 bg-orange-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                                            Join Now
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>


        </nav>
    );
};

export default Navbar;