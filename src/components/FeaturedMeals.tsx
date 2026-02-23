"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { toast } from "react-hot-toast";

// ১. আপনার ব্যাকএন্ড ডাটা অনুযায়ী ইন্টারফেস
interface IMeal {
    id: string;
    name: string;
    image_url: string;
    price: string | number;
    description: string;
    provider: {
        restaurant_name: string;
        address: string;
    };
}

const FeaturedMeals = () => {
    const [meals, setMeals] = useState<IMeal[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/meals");
                const result = await response.json();

                // ২. ডাটা সেট করার সময় result.data ব্যবহার করুন
                if (result.success && Array.isArray(result.data)) {
                    setMeals(result.data);
                } else {
                    toast.error("Data format is incorrect!");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Backend server is not responding!");
            } finally {
                setLoading(false);
            }
        };
        fetchMeals();
    }, []);

    const handleAddToCart = (meal: IMeal) => {
        addToCart({
            id: meal.id,
            name: meal.name,
            image_url: meal.image_url,
            price: meal.price,
        });
        // toast.success(`${meal.name} added to cart!`);
    };

    if (loading) return <div className="text-center py-20">Loading meals...</div>;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Featured Meals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {/* ১. slice(0, 4) দিয়ে মাত্র ৪টি কার্ড দেখানো নিশ্চিত করলাম */}
                    {meals.slice(0, 4).map((meal) => (
                        <div
                            key={meal.id}
                            className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md p-4 flex flex-col items-center h-full"
                        >
                            <div className="relative w-32 h-32 mb-4 flex-shrink-0">
                                <Image
                                    src={meal.image_url}
                                    alt={meal.name}
                                    fill
                                    className="object-cover rounded-full border-2 border-primary/20"
                                />
                            </div>

                            {/* ২. কন্টেন্ট এরিয়াকে flex-grow দিয়ে বাটনকে নিচে পুশ করা হয়েছে */}
                            <div className="flex flex-col items-center flex-grow w-full text-center">
                                <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{meal.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{meal.provider.restaurant_name}</p>
                                <p className="text-primary font-bold mt-auto">৳{meal.price}</p>
                            </div>

                            {/* ৩. বাটন এখন সবসময় কার্ডের নিচে ফিক্সড থাকবে */}
                            <Button
                                onClick={() => handleAddToCart(meal)}
                                className="mt-4 w-full bg-primary hover:bg-primary/90 text-white"
                            >
                                Order Now
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedMeals;