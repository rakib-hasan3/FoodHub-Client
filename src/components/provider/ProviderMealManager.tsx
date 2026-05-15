"use client";

import { useState } from "react";
import { Search, PlusCircle, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import MealCard from "@/components/MealCard";

export default function ProviderMealManager({ 
    initialMeals, 
    type = "all" 
}: { 
    initialMeals: any[], 
    type?: "all" | "offers" 
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const filteredMeals = initialMeals.filter(meal =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        {type === "offers" && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                                <Tag className="w-4 h-4 text-red-500" />
                                <span className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest">Active Deals</span>
                            </div>
                        )}
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                            {type === "offers" ? "My Offers & Discounts" : "My Kitchen Menu"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
                            {type === "offers" 
                                ? "Manage and view all your currently active discounted meals" 
                                : "Manage, edit and search your restaurant's delicacies"}
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/provider/AddMealModal")}
                        className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add New Meal
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative group max-w-2xl">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder={type === "offers" ? "Search your offers..." : "Search menu..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-16 pl-14 pr-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-semibold text-gray-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="pt-4">
                {filteredMeals.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm">
                        {type === "offers" ? <Tag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" /> : <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">No results found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                        {filteredMeals.map((meal) => (
                            <MealCard key={meal.id} meal={meal} isProvider={true} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
