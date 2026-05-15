import { ThemeProvider } from "@/app/context/ThemeProvider";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import { Metadata } from "next";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster as HotToaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "FoodHub",
  description: "Premium Food Delivery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true} className="[scrollbar-gutter:stable]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>
            {children}
            <SonnerToaster position="top-center" richColors />
            <HotToaster position="top-right" reverseOrder={false} />
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}