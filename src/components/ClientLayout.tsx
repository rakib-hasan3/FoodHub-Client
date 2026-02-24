"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/app/context/CartContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");
    const isProviderPath = pathname?.startsWith("/provider");

    const shouldHideHeaderFooter = isAdminPath || isProviderPath;

    return (
        <CartProvider>
            {!shouldHideHeaderFooter && <Navbar />}
            <main className="min-h-screen">
                {children}
            </main>
            {!shouldHideHeaderFooter && <Footer />}
        </CartProvider>
    );
}