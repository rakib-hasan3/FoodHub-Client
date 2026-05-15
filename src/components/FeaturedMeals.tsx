import React from "react";
import MealCard from "./MealCard";

async function getFeaturedMeals() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/meals`,
            { next: { revalidate: 60 } }
        );
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
            return result.data;
        }
        return [];
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

const FeaturedMeals = async () => {
    const meals = await getFeaturedMeals();

    if (meals.length === 0) return null;

    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20">
                        <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Handpicked for you</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                        Featured <span className="text-orange-500 italic">Selections</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto text-lg">
                        Explore our top-rated dishes, carefully selected to provide you with the ultimate culinary experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {meals.slice(0, 3).map((meal: any) => (
                        <MealCard key={meal.id} meal={meal} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedMeals;