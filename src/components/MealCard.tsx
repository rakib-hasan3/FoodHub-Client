"use client";

import { Utensils, ShoppingCart, Clock, Flame, Star, TrendingUp, Edit3, Trash2, Info } from "lucide-react";


import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { authClient } from "@/auth-client";
import { toast } from "sonner";

export interface MealType {
    id: string;
    name: string;
    image_url: string;
    description: string;
    price: string | number;
    featured?: boolean;
    trending?: boolean;
    preparationTime?: string;
    calories?: number | string;
    spiceLevel?: string;
    isAvailable?: boolean;
    rating?: number;
    totalReviews?: number;
    // Discount Fields
    isDiscounted?: boolean;
    discountPercent?: number;
    discountPrice?: string | number;
    offerText?: string;
    offerExpiresAt?: string;
    provider?: {
        restaurant_name: string;
        address: string;
    };
    category: {
        name: string;
    };
}


export default function MealCard({ meal, isProvider = false }: { meal: MealType, isProvider?: boolean }) {
    const { data } = authClient.useSession();
    const router = useRouter();
    const { addToCart } = useCart();

    const handleOrder = (e: React.MouseEvent) => {
        e.stopPropagation();
        const user = data?.user;

        if (!user) {
            toast.error("Please login first to order!");
            router.push("/login");
            return;
        }

        addToCart({
            id: meal.id,
            name: meal.name,
            image_url: meal.image_url,
            price: meal.isDiscounted ? meal.discountPrice! : meal.price,
            userId: user.id,
            quantity: 1,
        });
        toast.success(`${meal.name} added to cart!`);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/provider/edit-meal/${meal.id}`);
    };

    const handleCardClick = () => {
        if (!isProvider) {
            router.push(`/meals/${meal.id}`);
        }
    };

    return (
        <div 
            onClick={handleCardClick}
            className="group relative w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col cursor-pointer h-full"
        >
            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {meal.isDiscounted && (
                    <div className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl animate-pulse">
                        <Star className="w-3 h-3 fill-white" />
                        {meal.discountPercent}% OFF
                    </div>
                )}
                {meal.featured && (
                    <div className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl border border-white/10">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        Featured
                    </div>
                )}
                {meal.trending && (
                    <div className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                    </div>
                )}
            </div>

            {/* Image Container */}
            <div className="relative h-60 sm:h-64 lg:h-56 w-full overflow-hidden">
                <img
                    src={meal.image_url || "https://placehold.co/600x400?text=Premium+Meal"}
                    alt={meal.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
                    {meal.isDiscounted && (
                        <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-400 line-through px-2 py-0.5 rounded-lg text-[10px] font-bold border border-white/20">
                            ৳{meal.price}
                        </span>
                    )}
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white px-4 py-2 rounded-2xl font-black shadow-2xl border border-white/20 transition-transform group-hover:scale-110">
                        <span className="text-orange-500 mr-0.5">৳</span>
                        {meal.isDiscounted ? meal.discountPrice : meal.price}
                    </div>
                </div>

                {/* Status Badge */}
                {!meal.isAvailable && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-2xl">Sold Out</span>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-5 md:p-6 flex flex-col flex-1 relative bg-white dark:bg-zinc-900">
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1 rounded-md">
                            {meal.category.name}
                        </span>
                        {meal.spiceLevel && meal.spiceLevel !== 'NONE' && (
                            <div className="flex items-center gap-0.5">
                                {[...Array(meal.spiceLevel === 'EXTRA_HOT' ? 3 : meal.spiceLevel === 'HOT' ? 2 : 1)].map((_, i) => (
                                    <Flame key={i} className="w-3.5 h-3.5 text-red-500" />
                                ))}
                            </div>
                        )}
                    </div>

                    <h3 className="font-black text-lg md:text-xl text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-orange-500 transition-colors">
                        {meal.name}
                    </h3>

                    {meal.isDiscounted && meal.offerText && (
                        <p className="text-[10px] font-bold text-red-500 mb-2 uppercase tracking-tight flex items-center gap-1">
                            <Star size={10} className="fill-red-500" />
                            {meal.offerText}
                        </p>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 bg-yellow-400/10 dark:bg-yellow-400/5 px-2 py-0.5 rounded-lg">
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-[10px] font-black text-yellow-700 dark:text-yellow-500">{meal.rating || "4.8"}</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">({meal.totalReviews || "85"} reviews)</span>
                    </div>

                    {!isProvider && (
                        <div className="flex items-center gap-2 mb-3 text-gray-500 text-[10px] md:text-[11px] font-bold uppercase tracking-wide">
                            <Utensils size={12} className="text-orange-500" />
                            <span className="line-clamp-1 dark:text-gray-300">
                                {meal.provider?.restaurant_name || "Premium Kitchen"}
                            </span>
                        </div>
                    )}


                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-50 dark:border-white/5">
                        {meal.preparationTime && (
                            <div className="flex items-center gap-1.5 text-gray-400 text-[11px] md:text-xs font-medium">
                                <Clock className="w-3.5 h-3.5" />
                                {meal.preparationTime}
                            </div>
                        )}
                        {meal.calories && (
                            <div className="flex items-center gap-1.5 text-gray-400 text-[11px] md:text-xs font-medium">
                                <Flame className="w-3.5 h-3.5" />
                                {meal.calories} kcal
                            </div>
                        )}
                        {meal.isDiscounted && meal.offerExpiresAt && (
                            <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold uppercase">
                                <Clock className="w-3.5 h-3.5" />
                                Ends: {new Date(meal.offerExpiresAt).toLocaleDateString()}
                            </div>
                        )}
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed mb-6 italic">
                        "{meal.description}"
                    </p>
                </div>

                {/* Interaction Footer */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto">
                    {isProvider ? (
                        <>
                            <button
                                onClick={handleEdit}
                                className="w-full bg-gray-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-600 text-white dark:text-black hover:text-white dark:hover:text-white rounded-2xl py-3.5 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-gray-200 dark:shadow-none active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Edit3 size={14} />
                                Edit Meal
                            </button>
                            <button 
                                className="w-full sm:w-12 h-12 flex items-center justify-center bg-red-50 dark:bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all border border-red-100 dark:border-red-500/20 group/trash"
                                title="Delete Meal"
                            >
                                <Trash2 size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleOrder}
                                disabled={!meal.isAvailable}
                                className="flex-[2] w-full bg-gray-900 dark:bg-white hover:bg-orange-500 dark:hover:bg-orange-500 text-white dark:text-black hover:text-white dark:hover:text-white rounded-2xl py-4 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-gray-200 dark:shadow-none active:scale-95 flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:shadow-none disabled:text-gray-400"
                            >
                                <ShoppingCart size={14} />
                                Add To Bag
                            </button>
                            <button 
                                onClick={handleCardClick}
                                className="flex-1 w-full bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-2xl py-4 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 border border-gray-100 dark:border-white/5 active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Info size={14} />
                                Details
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}
