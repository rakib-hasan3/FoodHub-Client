"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    return (
        <nav className="w-full border-b bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-primary">
                    🍱 FoodHub
                </Link>

                {/* Center Links */}
                <div className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <Link href="/meals" className="hover:text-primary">Meals</Link>
                    <Link href="/providers" className="hover:text-primary">Providers</Link>
                </div>

                {/* Right Actions */}
                <div className="flex gap-2">
                    <Link href="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button>Register</Button>
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
