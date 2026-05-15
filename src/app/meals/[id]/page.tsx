"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, Clock, Flame, Users, Star, ArrowLeft, Heart, Share2, MapPin, CheckCircle2, Tag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/app/context/CartContext";
import { authClient } from "@/auth-client";

interface Meal {
    id: string;
    name: string;
    image_url: string;
    description: string;
    price: string | number;
    preparationTime?: string;
    calories?: number;
    servingSize?: string;
    spiceLevel?: string;
    ingredients?: string[];
    featured?: boolean;
    trending?: boolean;
    isAvailable?: boolean;
    rating?: number;
    totalReviews?: number;
    isDiscounted?: boolean;
    discountPercent?: number;
    discountPrice?: string | number;
    offerText?: string;
    offerExpiresAt?: string;
    reviews?: Array<{
        customer: { name: string };
        rating: number;
        comment: string;
        created_at: string;
    }>;
    category: {
        name: string;
    };
    provider: {
        id: string;
        restaurant_name: string;
        address: string;
    };
}

const MealDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { data: session } = authClient.useSession();
    
    const [meal, setMeal] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    const fetchMeal = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals/${id}`);
            const data = await res.json();
            if (data.success) {
                setMeal(data.data);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to load meal details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeal();
    }, [id]);

    const handleSubmitReview = async () => {
        if (!session?.user) {
            toast.error("Please login to share your experience!");
            return;
        }

        try {
            setSubmittingReview(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating: userRating,
                    comment: reviewComment,
                    customer_id: session.user.id
                }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Review submitted! Thank you for your feedback.");
                setReviewComment("");
                setUserRating(0);
                fetchMeal();
            } else {
                toast.error(data.message || "Failed to submit review");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while submitting your review");
        } finally {
            setSubmittingReview(false);
        }
    };


    const handleAddToCart = () => {
        if (!meal) return;
        const user = session?.user;

        if (!user) {
            toast.error("Please login to order!");
            router.push("/login");
            return;
        }

        addToCart({
            id: meal.id,
            name: meal.name,
            image_url: meal.image_url,
            price: meal.isDiscounted ? meal.discountPrice! : meal.price,
            userId: user.id,
            quantity: quantity,
        });
        toast.success(`${quantity} x ${meal.name} added to bag!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!meal) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
                <h1 className="text-2xl font-bold">Meal not found</h1>
                <button onClick={() => router.back()} className="text-orange-500 font-bold">Go Back</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-black pb-20">
            {/* Dynamic Background Header */}
            <div className="h-[40vh] md:h-[50vh] w-full relative overflow-hidden">
                <img 
                    src={meal.image_url} 
                    alt={meal.name}
                    className="w-full h-full object-cover scale-105 blur-sm brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] dark:from-black to-transparent" />
                
                {/* Header Controls */}
                <div className="absolute top-8 left-4 right-4 max-w-7xl mx-auto flex justify-between items-center z-20">
                    <button 
                        onClick={() => router.back()}
                        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-black transition-all"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-red-500 transition-all">
                            <Heart className="w-6 h-6" />
                        </button>
                        <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-orange-500 transition-all">
                            <Share2 className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Image and Details */}
                    <div className="lg:col-span-7 space-y-10">
                        <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-900 bg-white dark:bg-zinc-900 aspect-video">
                            <img 
                                src={meal.image_url} 
                                alt={meal.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {meal.trending && (
                                <div className="absolute top-6 left-6 bg-orange-500 text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl">
                                    Trending Now
                                </div>
                            )}
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-white/5">
                            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-500/10 px-6 py-3 rounded-2xl">
                                    <Clock className="w-5 h-5 text-orange-500" />
                                    <span className="font-black text-sm text-gray-700 dark:text-gray-200 uppercase">{meal.preparationTime || "15-20 min"}</span>
                                </div>
                                <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-500/10 px-6 py-3 rounded-2xl">
                                    <Flame className="w-5 h-5 text-blue-500" />
                                    <span className="font-black text-sm text-gray-700 dark:text-gray-200 uppercase">{meal.calories || 350} kcal</span>
                                </div>
                                <div className="flex items-center gap-3 bg-green-50 dark:bg-green-500/10 px-6 py-3 rounded-2xl">
                                    <Users className="w-5 h-5 text-green-500" />
                                    <span className="font-black text-sm text-gray-700 dark:text-gray-200 uppercase">{meal.servingSize || "1 Person"}</span>
                                </div>
                            </div>

                            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Culinary Experience</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10 italic">
                                "{meal.description}"
                            </p>

                            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Ingredients</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {(meal.ingredients || ["Fresh Basil", "Himalayan Salt", "Virgin Oil", "Artisan Flour"]).map((ing, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                        {ing}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-white/5">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Culinary Reviews</h2>
                                    <p className="text-gray-500 font-medium italic">What fellow foodies are saying</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 justify-end mb-1">
                                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                        <span className="text-3xl font-black dark:text-white">{meal.rating || "4.8"}</span>
                                    </div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{meal.totalReviews || "85"} Reviews</p>
                                </div>
                            </div>

                            {/* Submit Review Form */}
                            <div className="mb-16 p-8 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/5">
                                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Share Your Experience</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-gray-500">Rate this dish:</span>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button 
                                                    key={star} 
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => setUserRating(star)}
                                                    className="transition-all duration-200 transform hover:scale-110"
                                                >
                                                    <Star 
                                                        className={`w-8 h-8 ${
                                                            (hoverRating || userRating) >= star 
                                                            ? "fill-yellow-400 text-yellow-400" 
                                                            : "text-gray-300 dark:text-zinc-700"
                                                        }`} 
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <textarea 
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder="Tell us about the flavors, presentation, and service..."
                                        className="w-full h-32 bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-gray-100 dark:border-white/10 outline-none focus:border-orange-500 transition-all font-medium text-gray-700 dark:text-gray-200"
                                    />
                                    <button 
                                        onClick={handleSubmitReview}
                                        disabled={!userRating || !reviewComment.trim() || submittingReview}
                                        className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        {submittingReview ? "Submitting..." : "Submit Review"}
                                    </button>
                                </div>
                            </div>


                            {/* Review List */}
                            <div className="space-y-8">
                                {meal.reviews && meal.reviews.length > 0 ? (
                                    meal.reviews.map((review, i) => (
                                        <div key={i} className="pb-8 border-b border-gray-50 dark:border-white/5 last:border-0">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-xl">
                                                        {review.customer.name[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-gray-900 dark:text-white">{review.customer.name}</h4>
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                            {new Date(review.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, idx) => (
                                                        <Star 
                                                            key={idx} 
                                                            className={`w-4 h-4 ${idx < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200 dark:text-zinc-800"}`} 
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed italic">"{review.comment}"</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-400 font-medium italic">No reviews yet. Be the first to share your experience!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order and Provider Info */}
                    <div className="lg:col-span-5 space-y-8 h-fit lg:sticky lg:top-28">

                        {/* Order Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-gray-100 dark:border-white/5">
                            <span className="text-xs font-black text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 px-4 py-2 rounded-lg inline-block mb-6">
                                {meal.category.name}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                                {meal.name}
                            </h1>
                            
                            {meal.isDiscounted && (
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    {meal.offerText && (
                                        <div className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-3 py-1.5 rounded-xl">
                                            <Tag className="w-4 h-4 text-red-500" />
                                            <span className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest">{meal.offerText}</span>
                                        </div>
                                    )}
                                    {meal.discountPercent && (
                                        <span className="text-xs font-black text-white bg-red-500 px-3 py-1.5 rounded-xl shadow-lg shadow-red-500/20 uppercase tracking-widest animate-pulse">
                                            {meal.discountPercent}% OFF
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="flex items-baseline gap-3 mb-10">
                                {meal.isDiscounted ? (
                                    <>
                                        <span className="text-4xl font-black text-orange-500">৳{meal.discountPrice}</span>
                                        <span className="text-2xl font-bold text-gray-400 line-through">৳{meal.price}</span>
                                    </>
                                ) : (
                                    <span className="text-4xl font-black text-gray-900 dark:text-white">৳{meal.price}</span>
                                )}
                                <span className="text-gray-400 text-sm font-medium ml-1">Inclusive of all taxes</span>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                                    <span className="font-bold text-gray-600 dark:text-gray-400">Select Quantity</span>
                                    <div className="flex items-center gap-6">
                                        <button 
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center font-black text-xl shadow-sm border border-gray-200 dark:border-white/10 hover:border-orange-500 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="font-black text-xl dark:text-white">{quantity}</span>
                                        <button 
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center font-black text-xl shadow-sm border border-gray-200 dark:border-white/10 hover:border-orange-500 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleAddToCart}
                                    className="w-full h-20 bg-orange-500 hover:bg-orange-600 text-white rounded-3xl font-black text-xl shadow-2xl shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4"
                                >
                                    <ShoppingCart className="w-8 h-8" />
                                    Add to Bag • ৳{((meal.isDiscounted ? Number(meal.discountPrice) : Number(meal.price)) * quantity).toFixed(0)}
                                </button>
                                
                                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    Instant delivery available
                                </div>
                            </div>
                        </div>

                        {/* Kitchen Info */}
                        <div className="bg-zinc-900 rounded-[2rem] p-8 border border-white/5 overflow-hidden relative">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                                        <Star className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black text-lg">{meal.provider.restaurant_name}</h3>
                                        <p className="text-gray-400 text-sm font-medium flex items-center gap-1.5">
                                            <MapPin className="w-3 h-3" /> {meal.provider.address}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => router.push(`/restaurants/${meal.provider.id}`)}
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-sm border border-white/10 transition-all tracking-wider uppercase"
                                >
                                    Visit Kitchen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetailsPage;
