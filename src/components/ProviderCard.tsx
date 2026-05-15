"use client";

import React from "react";
import Image from "next/image";
import { Star, MapPin, ArrowRight, Utensils, Info, Clock, Store } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProviderType {
    id: string;
    restaurant_name: string;
    address: string;
    image?: string;
    rating?: number;
    totalMeals?: number;
}

export default function ProviderCard({ provider }: { provider: ProviderType }) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/restaurants/${provider.id}`);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="group relative w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col cursor-pointer h-full"
        >
            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <div className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl">
                    <Store className="w-3 h-3" />
                    Partner
                </div>
                {(provider.rating || 0) >= 4.5 && (
                    <div className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl border border-white/10">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        Top Rated
                    </div>
                )}
            </div>

            {/* Image Container */}
            <div className="relative h-60 sm:h-64 lg:h-56 w-full overflow-hidden">
                <Image
                    src={provider.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"}
                    alt={provider.restaurant_name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Available Items Tag (Positioned like price in MealCard) */}
                <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white px-4 py-2 rounded-2xl font-black shadow-2xl border border-white/20 transition-transform group-hover:scale-110">
                        <span className="text-orange-500 mr-1">{provider.totalMeals || "12"}+</span>
                        <span className="text-[10px] uppercase tracking-tighter">Items</span>
                    </div>
                </div>
            </div>

            {/* Content Container - Matching MealCard structure */}
            <div className="p-5 md:p-6 flex flex-col flex-1 relative bg-white dark:bg-zinc-900">
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1 rounded-md">
                            Kitchen Partner
                        </span>
                        <div className="flex items-center gap-0.5">
                            <Utensils className="w-4 h-4 text-orange-500" />
                        </div>
                    </div>

                    <h3 className="font-black text-xl md:text-2xl text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-orange-500 transition-colors">
                        {provider.restaurant_name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1 bg-yellow-400/10 dark:bg-yellow-400/5 px-2 py-0.5 rounded-lg">
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-[10px] font-black text-yellow-700 dark:text-yellow-500">{provider.rating || "4.5"}</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">(Customer Rating)</span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-50 dark:border-white/5">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <MapPin size={14} className="text-orange-500 shrink-0" />
                            <p className="text-xs font-bold line-clamp-1 italic">{provider.address}</p>
                        </div>
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed mb-6 italic">
                        Experience the finest culinary creations from {provider.restaurant_name}. High quality ingredients and expert chefs at your service.
                    </p>
                </div>

                {/* Interaction Footer - Matching MealCard buttons */}
                <div className="flex flex-col items-center gap-3 mt-auto">
                    <button
                        onClick={handleCardClick}
                        className="w-full bg-gray-900 dark:bg-white hover:bg-orange-500 dark:hover:bg-orange-500 text-white dark:text-black hover:text-white dark:hover:text-white rounded-2xl py-4 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-gray-200 dark:shadow-none active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Utensils size={14} />
                        View Full Menu
                    </button>
                </div>
            </div>
        </div>
    );
}
