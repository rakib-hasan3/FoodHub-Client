"use client"; // এটি অবশ্যই একদম উপরে থাকতে হবে

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // চেক করবে পাথ কি /admin দিয়ে শুরু হয়েছে কি না
  const isAdminPath = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* যদি অ্যাডমিন না হয় তবেই কেবল Navbar দেখাবে */}
        {!isAdminPath && <Navbar />}

        <main className="min-h-screen">
          {children}
        </main>

        {/* যদি অ্যাডমিন না হয় তবেই কেবল Footer দেখাবে */}
        {!isAdminPath && <Footer />}
      </body>
    </html>
  );
}