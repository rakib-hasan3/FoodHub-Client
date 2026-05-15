"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import ProviderCard from "@/components/ProviderCard";

interface ProviderType {
    id: string;
    restaurant_name: string;
    address: string;
    image?: string;
    rating?: number;
    totalMeals?: number;
}

export default function RestaurantList({ initialProviders }: { initialProviders: ProviderType[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProviders = initialProviders.filter(p => 
        p.restaurant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative z-10">
            {/* Cinematic Header Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20">
                        <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Our Culinary Partners</span>
                    </div>
                    
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
                            World-Class <span className="text-orange-500 italic">Kitchens</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto text-lg md:text-xl">
                            Discover the finest restaurants and local culinary artists dedicated to bringing extraordinary flavors to your table.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by restaurant name or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-20 pl-16 pr-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-[2rem] shadow-2xl focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-white text-lg placeholder:text-gray-300 dark:placeholder:text-gray-600"
                        />
                    </div>
                </div>
            </section>

            {/* Providers Grid Section */}
            <section className="max-w-7xl mx-auto px-4">
                {filteredProviders.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/5 backdrop-blur-xl">
                        <div className="w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-10 h-10 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No kitchens found</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium italic">Try adjusting your search to find more local flavors.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProviders.map((provider) => (
                            <ProviderCard key={provider.id} provider={provider} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
