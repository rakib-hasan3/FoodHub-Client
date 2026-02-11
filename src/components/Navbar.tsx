"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; // আপনার পাথ অনুযায়ী ঠিক করে নিন
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    // সেশন ডেটা নেওয়ার জন্য useSession ব্যবহার করছি
    const { data: session, isPending } = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // লগআউট হলে লগইন পেজে পাঠাবে
                    router.refresh(); // পেজটি রিফ্রেশ করবে যাতে স্টেট আপডেট হয়
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
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <Link href="/meals" className="hover:text-primary">Meals</Link>
                    <Link href="/providers" className="hover:text-primary">Providers</Link>
                </div>

                {/* Right Actions - Conditional Rendering */}
                <div className="flex gap-2">
                    {isPending ? (
                        <p className="text-sm text-gray-400">Loading...</p>
                    ) : session ? (
                        // যদি ইউজার লগইন থাকে
                        <>
                            <span className="flex items-center mr-2 text-sm font-medium text-gray-600">
                                Hi, {session.user.name}
                            </span>
                            <Button
                                variant="destructive"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        // যদি ইউজার লগআউট থাকে
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