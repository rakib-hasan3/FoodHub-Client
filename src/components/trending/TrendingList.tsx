"use client";

import React, { useState } from "react";
import MealCard, { MealType } from "@/components/MealCard";
import { Clock, Calendar, Star, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function TrendingList({ initialMeals }: { initialMeals: MealType[] }) {
    const [activeFilter, setActiveFilter] = useState("Today");

    const filters = [
        { name: "Today", icon: <Clock size={16} /> },
        { name: "This Week", icon: <Calendar size={16} /> },
        { name: "This Month", icon: <Star size={16} /> }
    ];

    // In a real app, you'd filter by actual timestamps. 
    // For this UI, we use the same trending list but could simulate logic.
    const meals = initialMeals;

    return (
        <div className="max-w-7xl mx-auto space-y-16">
            {/* Header Section */}
            <header className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 mx-auto">
                    <span className="text-sm font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Live Trending</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
                    What's <span className="text-orange-500">Popular</span> Now
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                    Discover the most ordered and highly-rated dishes from our top kitchens across the city.
                </p>

                {/* Premium Filter Navbar */}
                <div className="flex flex-wrap justify-center items-center gap-3 pt-6">
                    {filters.map((filter) => (
                        <button
                            key={filter.name}
                            onClick={() => setActiveFilter(filter.name)}
                            className={`
                                flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300
                                ${activeFilter === filter.name 
                                    ? "bg-zinc-900 text-white shadow-2xl shadow-zinc-900/40 scale-105" 
                                    : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50 dark:bg-zinc-900 dark:border-white/5 dark:text-gray-400"}
                            `}
                        >
                            {filter.icon}
                            {filter.name}
                        </button>
                    ))}
                </div>
            </header>

            {/* Content Grid */}
            <div className="min-h-[500px]">
                {meals.length === 0 ? (
                    <div className="text-center py-32 space-y-6">
                        <UtensilsCrossed className="w-20 h-20 text-gray-200 mx-auto" />
                        <p className="text-gray-400 font-bold text-2xl tracking-tight">No trending items for this timeframe yet!</p>
                        <Link href="/meals" className="text-orange-500 font-black uppercase tracking-widest text-sm hover:underline">Explore Menu</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {meals.map((meal) => (
                            <div key={meal.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <MealCard meal={meal} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
