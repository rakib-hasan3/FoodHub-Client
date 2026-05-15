import React from "react";
import MealCard, { MealType } from "./MealCard";
import { Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

async function getSpecialOffers() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`, { next: { revalidate: 60 } });
        const data = await res.json();
        if (data.success) {
            // Filter discounted meals and limit to 3
            return data.data.filter((m: MealType) => m.isDiscounted).slice(0, 3);
        }
        return [];
    } catch (err) {
        console.error("Failed to fetch offers", err);
        return [];
    }
}

const SpecialOffers = async () => {
    const meals = await getSpecialOffers();

    if (meals.length === 0) return null;

    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                            <Tag className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest">Exclusive Deals</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                            Special <span className="text-red-500 underline decoration-8 decoration-red-500/20 underline-offset-8">Offers</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl text-lg">
                            Grab the best discounts on your favorite meals before they expire.
                        </p>
                    </div>

                    <Link
                        href="/offers"
                        className="group flex items-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-zinc-900/20 w-full sm:w-auto justify-center"
                    >
                        View All Offers
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

export default SpecialOffers;
