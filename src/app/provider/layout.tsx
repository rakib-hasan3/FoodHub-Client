"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import ProviderSidebar from "@/components/ProviderSidebar";

export default function ProviderAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Overlay (mobile) */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed z-40 top-0 left-0 h-screen w-64 bg-white border-r transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* 🔥 IMPORTANT CHANGE */}
                <ProviderSidebar onClose={() => setOpen(false)} />
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">

                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">

                    {/* Hamburger */}
                    <button onClick={() => setOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>

                    <span className="font-semibold">Provider Panel</span>

                    {/* optional empty space for balance */}
                    <div className="w-6" />
                </div>

                <main className="p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

            </div>
        </div>
    );
}