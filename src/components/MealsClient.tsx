"use client";

import { useState, useMemo, useEffect } from "react";
import MealCard, { MealType } from "@/components/MealCard";
import { Coffee, Pizza, Beef, Fish, IceCream, UtensilsCrossed, Salad, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MealsClient({ meals, initialCategory }: { meals: MealType[], initialCategory?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Extract unique categories from meals dynamically
    const categories = useMemo(() => {
        const cats = meals.map(m => m.category?.name).filter(Boolean);
        return ["All", ...Array.from(new Set(cats))];
    }, [meals]);

    // Initialize state with the provided initialCategory if it matches any real category
    const [activeCategory, setActiveCategory] = useState<string>(() => {
        if (initialCategory) {
            const matched = categories.find(c => c.toLowerCase() === initialCategory.toLowerCase());
            if (matched) return matched;
        }
        return "All";
    });

    const [searchQuery, setSearchQuery] = useState("");

    // Update URL when category changes, or read from URL back if navigating
    useEffect(() => {
        const currentParam = searchParams?.get("category");
        if (activeCategory === "All" && currentParam) {
            router.replace("/meals", { scroll: false });
        } else if (activeCategory !== "All" && currentParam?.toLowerCase() !== activeCategory.toLowerCase()) {
            router.replace(`/meals?category=${activeCategory.toLowerCase()}`, { scroll: false });
        }
    }, [activeCategory, router, searchParams]);

    // Filter meals based on the selected category and search query
    const filteredMeals = useMemo(() => {
        return meals.filter(m => {
            const matchesCategory = activeCategory === "All" || m.category?.name === activeCategory;
            const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                m.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [meals, activeCategory, searchQuery]);

    // Map common food categories to beautiful Lucide icons
    const getCategoryIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('pizza')) return <Pizza size={18} />;
        if (n.includes('burger') || n.includes('beef') || n.includes('meat') || n.includes('steak')) return <Beef size={18} />;
        if (n.includes('sushi') || n.includes('fish') || n.includes('seafood')) return <Fish size={18} />;
        if (n.includes('dessert') || n.includes('cake') || n.includes('sweet') || n.includes('ice')) return <IceCream size={18} />;
        if (n.includes('coffee') || n.includes('drink') || n.includes('beverage') || n.includes('tea')) return <Coffee size={18} />;
        if (n.includes('salad') || n.includes('veg') || n.includes('healthy')) return <Salad size={18} />;
        return <UtensilsCrossed size={18} />;
    };

    return (
        <div className="w-full space-y-12">
            {/* Search Bar Section */}
            <div className="max-w-3xl mx-auto w-full relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Craving something specific? Search here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 md:h-20 pl-14 pr-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-lg text-zinc-800 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
                />
            </div>

            {/* Premium Category Navbar */}
            <div className="relative z-20">
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full px-4 md:px-0">
                    {categories.map((cat, index) => {
                        const isActive = activeCategory === cat;
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                                    group relative flex items-center gap-2.5 px-6 py-3.5 rounded-[1.25rem] font-semibold transition-all duration-300 flex-shrink-0
                                    ${isActive 
                                        ? "bg-zinc-900 text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] dark:bg-white dark:text-black transform md:hover:scale-105" 
                                        : "bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 dark:bg-zinc-900/50 dark:text-zinc-400 dark:border-zinc-800 dark:hover:text-white dark:hover:bg-zinc-800"}
                                `}
                            >
                                <span className={`flex items-center justify-center transition-colors duration-300 ${isActive ? "text-orange-500" : "text-zinc-400 group-hover:text-orange-500 dark:text-zinc-500"}`}>
                                    {getCategoryIcon(cat)}
                                </span>
                                <span>{cat}</span>
                                
                                {/* Active State Indicator / Glow */}
                                {isActive && (
                                    <span className="absolute inset-0 rounded-[1.25rem] border-2 border-zinc-900/10 dark:border-white/10 pointer-events-none"></span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Filtered Meals Grid */}
            <div className="min-h-[400px]">
                {filteredMeals.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm backdrop-blur-sm">
                        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UtensilsCrossed className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400 font-bold text-xl">No meals found for this category!</p>
                        <button 
                            onClick={() => setActiveCategory("All")}
                            className="mt-6 text-orange-500 hover:text-orange-600 font-medium underline underline-offset-4"
                        >
                            View All Meals
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full transition-all duration-500">
                        {filteredMeals.map((meal) => (
                            <div 
                                key={meal.id} 
                                className="flex justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                            >
                                <MealCard meal={meal} />
                            </div>
                        ))}
                    </div>

                )}
            </div>
            

        </div>
    );
}
