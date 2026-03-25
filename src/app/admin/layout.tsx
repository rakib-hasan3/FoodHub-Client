"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Overlay */}
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
                {/* 🔥 FIX: onClose pass করা */}
                <Sidebar onClose={() => setOpen(false)} />

                {/* Mobile close button (extra UX 🔥) */}
                <div className="md:hidden absolute top-3 right-3">
                    <button onClick={() => setOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 md:ml-64">

                {/* Mobile header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">

                    {/* Open button */}
                    <button onClick={() => setOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>

                    <span className="font-semibold">Admin Panel</span>

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