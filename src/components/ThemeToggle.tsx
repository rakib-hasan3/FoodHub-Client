"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = ({ className }: { className?: string }) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className={`p-2 w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5 ${className}`}>
            <div className="w-5 h-5 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
        </div>
    );

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all duration-300 ${className}`}
            title="Toggle Theme"
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeToggle;
