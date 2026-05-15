"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import { CartProvider } from "@/app/context/CartContext";
import { AuthProvider } from "@/app/context/AuthContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");
    const isProviderPath = pathname?.startsWith("/provider");

    const shouldHideHeaderFooter = isAdminPath || isProviderPath;

    return (
        <AuthProvider>
            <CartProvider>
            {!shouldHideHeaderFooter && <Navbar />}
            <main className="min-h-screen">
                {children}
            </main>
            {!shouldHideHeaderFooter && <AIAssistant />}
            {!shouldHideHeaderFooter && <Footer />}
            </CartProvider>
        </AuthProvider>
    );
}