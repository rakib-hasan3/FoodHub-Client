"use client";

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



const Navbar = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/login";
                },
            },
        });
    };

    return (
        <nav className="w-full border-b bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-primary">
                    🍱 FoodHub
                </Link>

                {/* Center Links */}
                <div className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="/" prefetch={false} className="hover:text-primary">
                        Home
                    </Link>
                    <Link href="/meals" prefetch={false} className="hover:text-primary">
                        Browse Meals
                    </Link>
                    <Link href="/restaurants" prefetch={false} className="hover:text-primary">
                        Restaurants
                    </Link>
                    <Link href="/about" prefetch={false} className="hover:text-primary">
                        About
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center  gap-2">
                    {isPending ? (
                        <p className="text-sm text-gray-400">Loading...</p>
                    ) : session ? (
                        <>
                            {/* ✅ Cart */}
                            <Link href="/cart" className="relative">
                                <ShoppingCart className="w-5 h-5 hover:text-primary cursor-pointer" />
                            </Link>

                            {/* ✅ My Orders */}
                            <Link
                                href="/my-orders"
                                className="text-sm  font-medium hover:text-primary"
                            >
                                My Orders
                            </Link>

                            {/* ✅ Profile Icon */}
                            {/* <Link href="/profile">
                                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
                                    <User className="w-5 h-5" />
                                </div>
                            </Link> */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
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

                            {/* ✅ Logout */}
                            <Button variant="destructive" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href="/signup">
                                <Button>Register</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;