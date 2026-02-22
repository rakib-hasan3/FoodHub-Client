"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ShoppingCart, User } from "lucide-react";
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

    useEffect(() => {
        // রিঅ্যাক্টকে শান্ত রাখতে setTimeout ব্যবহার
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
                <Link href="/" className="text-xl font-bold text-primary">
                    🍱 FoodHub
                </Link>

                <div className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <Link href="/meals" className="hover:text-primary">Browse Meals</Link>
                    <Link href="/restaurants" className="hover:text-primary">Restaurants</Link>
                    <Link href="/about" className="hover:text-primary">About</Link>
                </div>

                <div className="flex items-center gap-2">
                    {isPending ? (
                        <p className="text-sm text-gray-400">Loading...</p>
                    ) : session ? (
                        <>
                            <Link href="/cart" className="relative group p-2 inline-block">
                                {mounted && itemCount > 0 && (
                                    <span className="absolute  top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-black ring-2 ring-white animate-in zoom-in duration-300">
                                        {itemCount}
                                    </span>
                                )}
                                <ShoppingCart className="w-6 h-6 group-hover:text-primary transition-colors text-gray-700" />

                            </Link>

                            <Link href="/my-orders" className="text-sm font-medium hover:text-primary">
                                My Orders
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                                        <User className="w-5 h-5" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => router.push("/profile")}>My Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push("/profile/edit")}>Edit Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant="destructive" size="sm" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <div className="flex gap-2">
                            <Link href="/login"><Button variant="outline" size="sm">Login</Button></Link>
                            <Link href="/signup"><Button size="sm">Register</Button></Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;