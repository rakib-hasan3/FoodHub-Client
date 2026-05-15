import React from "react";
import MealCard, { MealType } from "./MealCard";
import { TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

async function getTrendingMeals() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`, { next: { revalidate: 60 } });
        const data = await res.json();
        if (data.success) {
            // Filter trending meals and limit to 3
            return data.data.filter((m: MealType) => m.trending).slice(0, 3);
        }
        return [];
    } catch (err) {
        console.error("Failed to fetch trending meals", err);
        return [];
    }
}

const TrendingMeals = async () => {
    const meals = await getTrendingMeals();

    if (meals.length === 0) return null;

    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                            <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Hot Right Now</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                            Trending <span className="text-orange-500 underline decoration-8 decoration-orange-500/20 underline-offset-8">Flavors</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl text-lg">
                            The dishes everyone is talking about. Hand-picked from our top-rated local kitchens.
                        </p>
                    </div>

                    <Link
                        href="/trending"
                        className="group flex items-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-zinc-900/20 w-full sm:w-auto justify-center"
                    >
                        Explore Trending
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {meals.map((meal: MealType) => (
                        <div key={meal.id} className="w-full">
                            <MealCard meal={meal} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingMeals;
