"use client";

import { useState } from "react";
import { Menu, X, Bell, Search, User } from "lucide-react";
import ProviderSidebar from "@/components/ProviderSidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function ProviderAdminLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">

            {/* Mobile Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div
                className={`fixed z-50 top-0 left-0 h-screen w-72 bg-white dark:bg-zinc-950 border-r border-gray-100 dark:border-white/5 transition-transform duration-500 ease-in-out
                ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 shadow-2xl md:shadow-none`}
            >
                <ProviderSidebar onClose={() => setOpen(false)} />
                
                {/* Mobile close button */}
                <button 
                    onClick={() => setOpen(false)}
                    className="md:hidden absolute top-6 right-6 p-2 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 hover:text-orange-500 transition-all"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                
                {/* Header Area */}
                <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 md:px-8 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
                    
                    {/* Left side: Mobile Menu + Search */}
                    <div className="flex items-center gap-4 flex-1">
                        <button 
                            onClick={() => setOpen(true)}
                            className="md:hidden p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus-within:border-orange-500/50 focus-within:bg-white dark:focus-within:bg-zinc-900 transition-all w-full max-w-md group">
                            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500" />
                            <input 
                                type="text" 
                                placeholder="Search menu, orders..." 
                                className="bg-transparent border-none outline-none text-sm font-medium w-full text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Right side: Utils + User */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <ThemeToggle className="flex" />
                        
                        <button className="relative p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500 transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-black"></span>
                        </button>

                        <div className="h-8 w-px bg-gray-100 dark:bg-white/5 mx-1 hidden sm:block" />

                        <div className="flex items-center gap-3 pl-1 pr-1.5 py-1 rounded-full border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all cursor-pointer">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/20">
                                <User size={18} />
                            </div>
                            <div className="hidden lg:block pr-2">
                                <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">Provider</p>
                                <p className="text-[10px] font-bold text-orange-500 uppercase">Chef Partner</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Wrapper */}
                <main className="p-4 md:p-8 lg:p-10 flex-1 overflow-y-auto">
                    <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}