// src/app/layout.tsx
import ClientLayout from "@/components/ClientLayout"; // পাথ চেক করুন
import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Food delivery app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* সব ক্লায়েন্ট লজিক এখন ClientLayout এর ভেতরে */}
        <ClientLayout>
          {children}
          <Toaster position="top-right" />
        </ClientLayout>
      </body>
    </html>
  );
}