"use client";

import { useState } from "react";
import { Star, MessageSquare, User, Utensils, Calendar, Quote, Trash2 } from "lucide-react";

export type Review = {
    id: string;
    rating: number;
    comment: string;
    user: {
        name: string;
    };
    meal: {
        name: string;
    };
    createdAt?: string;
};

interface ReviewListManagerProps {
    initialReviews: Review[];
}

export default function ReviewListManager({ initialReviews }: ReviewListManagerProps) {
    const [reviews] = useState<Review[]>(initialReviews);

    return (
        <div className="space-y-10 max-w-[1400px] mx-auto pb-10">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <Star className="w-5 h-5 text-yellow-500" />
                        </div>
                        <span className="text-[10px] font-black text-yellow-600 dark:text-yellow-400 uppercase tracking-[0.2em]">Sentiment Analysis</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Community Reviews</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Monitor and moderate global customer sentiment</p>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="px-6 py-2 text-center border-r border-gray-100 dark:border-white/5">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Feedback Count</p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{reviews.length}</p>
                    </div>
                    <div className="px-6 py-2 text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Avg Rating</p>
                        <p className="text-2xl font-black text-orange-500 mt-1">
                            {reviews.length > 0 
                                ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
                                : "0.0"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="group relative bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/20 dark:shadow-none hover:border-orange-500/30 dark:hover:border-orange-500/20 transition-all duration-500 overflow-hidden">
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 dark:text-white text-lg tracking-tight leading-none">{review.user?.name || "Anonymous User"}</h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <Utensils size={12} className="text-orange-500" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{review.meal?.name || "Unknown Meal"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-black text-yellow-700 dark:text-yellow-500">{review.rating.toFixed(1)}</span>
                                </div>
                            </div>

                            <div className="relative">
                                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-100 dark:text-white/5 -z-0" />
                                <p className="text-gray-600 dark:text-gray-400 font-medium italic relative z-10 leading-relaxed px-2">
                                    "{review.comment}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50 dark:border-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Calendar size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Historical Record"}
                                    </span>
                                </div>
                                <button className="p-2.5 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-rose-500 rounded-xl transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Decorative Blur */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all duration-700" />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-32 bg-gray-50/50 dark:bg-white/[0.01] rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-center">
                        <MessageSquare size={48} className="text-gray-200 dark:text-gray-800 mb-4" />
                        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Zero Sentiment Logs</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">No community feedback has been registered yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
