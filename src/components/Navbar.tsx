"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "../../auth-client";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Menu, X } from "lucide-react"; // 👈 add Menu, X
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/app/context/CartContext";

const Navbar = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const { cartItems } = useCart();
    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // 👈 new state

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/login";
                },
            },
        });
    };

    const itemCount = mounted ? cartItems.length : 0;

    return (
        <nav className="w-full border-b bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-primary">
                    🍱 FoodHub
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="/">Home</Link>
                    <Link href="/meals">Browse Meals</Link>
                    <Link href="/restaurants">Restaurants</Link>
                    <Link href="/about">About</Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>

                    {isPending ? (
                        <p className="text-sm text-gray-400">Loading...</p>
                    ) : session ? (
                        <>
                            <Link href="/cart" className="relative p-2">
                                {mounted && itemCount > 0 && (
                                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-black">
                                        {itemCount}
                                    </span>
                                )}
                                <ShoppingCart className="w-6 h-6" />
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                                        <User className="w-5 h-5" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                                        My Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push("/profile/edit")}>
                                        Edit Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="hidden md:flex gap-2">
                            <Link href="/login"><Button variant="outline" size="sm">Login</Button></Link>
                            <Link href="/signup"><Button size="sm">Register</Button></Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Drawer Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 md:hidden 
    ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-bold text-lg">Menu</span>
                    <button onClick={() => setMenuOpen(false)}>
                        <X />
                    </button>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-4 p-4 text-sm font-medium">
                    <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link href="/meals" onClick={() => setMenuOpen(false)}>Browse Meals</Link>
                    <Link href="/restaurants" onClick={() => setMenuOpen(false)}>Restaurants</Link>
                    <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>

                    {!session && (
                        <>
                            <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link href="/signup" onClick={() => setMenuOpen(false)}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;