"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/app/context/CartContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");

    return (
        <CartProvider>
            {!isAdminPath && <Navbar />}
            <main className="min-h-screen">
                {children}
            </main>
            {!isAdminPath && <Footer />}
        </CartProvider>
    );
}