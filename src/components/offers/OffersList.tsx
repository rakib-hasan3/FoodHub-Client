"use client";

import React, { useState, useEffect } from "react";
import MealCard, { MealType } from "@/components/MealCard";
import { Tag, Sparkles, Clock, Layers, Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OffersList({ initialOffers }: { initialOffers: MealType[] }) {
    const [activeTab, setActiveTab] = useState("All Offers");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMeals, setFilteredMeals] = useState<MealType[]>(initialOffers);

    const tabs = [
        { name: "All Offers", icon: <Tag className="w-4 h-4" /> },
        { name: "Trending Deals", icon: <Sparkles className="w-4 h-4" /> },
        { name: "Expiring Soon", icon: <Clock className="w-4 h-4" /> },
        { name: "Combo Offers", icon: <Layers className="w-4 h-4" /> },
    ];

    useEffect(() => {
        let result = initialOffers;

        if (searchQuery) {
            result = result.filter(m => 
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeTab === "Trending Deals") {
            result = result.filter(m => m.trending);
        } else if (activeTab === "Expiring Soon") {
            result = result.filter(m => m.offerExpiresAt);
        } else if (activeTab === "Combo Offers") {
            result = result.filter(m => m.offerText?.toLowerCase().includes("combo") || m.name.toLowerCase().includes("combo"));
        }

        setFilteredMeals(result);
    }, [activeTab, searchQuery, initialOffers]);

    return (
        <>
            {/* Hero Section */}
            <div className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-500/10 via-transparent to-transparent -z-10" />
                <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] -z-10 animate-pulse" />
                
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/20 mx-auto"
                    >
                        <Tag className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exclusive Deals</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tighter"
                    >
                        Big Savings on <br />
                        <span className="text-orange-500">Your Favorites</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto text-base sm:text-lg px-4"
                    >
                        Satisfy your cravings for less. Discover the best discounts, combo deals, and limited-time offers from top-rated restaurants.
                    </motion.p>
                </div>
            </div>

            {/* Controls Section */}
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-4 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search offers..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-14 pr-6 rounded-full bg-gray-50 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-black focus:border-orange-500/50 transition-all outline-none text-sm font-bold dark:text-white"
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-gray-100/50 dark:bg-white/5 rounded-3xl lg:rounded-full w-full lg:w-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    activeTab === tab.name 
                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" 
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-2 ml-auto">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Displaying</span>
                        <div className="px-4 py-2 bg-orange-50 dark:bg-orange-500/10 rounded-xl text-orange-600 dark:text-orange-400 font-black text-sm">
                            {filteredMeals.length} Results
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4">
                {filteredMeals.length > 0 ? (
                    <motion.div 
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredMeals.map((meal) => (
                                <motion.div
                                    key={meal.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MealCard meal={meal} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="py-20 text-center space-y-6">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto">
                            <Filter className="w-10 h-10 text-gray-300" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black dark:text-white">No active offers found</h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Try adjusting your filters or search terms.</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
