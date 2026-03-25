"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "../../auth-client";

// Meal টাইপ
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
    const router = useRouter();

    const { data: session } = authClient.useSession();

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/meals`
                );
                const result = await response.json();

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
        // ❌ login না থাকলে redirect
        if (!session) {
            toast.error("Please login first!");
            router.push("/login");
            return;
        }

        addToCart({
            id: meal.id,
            name: meal.name,
            image_url: meal.image_url,
            price: meal.price,
            userId: session.user.id, // ✅ important
            quantity: 1,
        });
    };

    if (loading)
        return <div className="text-center py-20">Loading meals...</div>;

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
                    🍽️ Featured Meals
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {meals.slice(0, 4).map((meal) => (
                        <div
                            key={meal.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col items-center"
                        >
                            <div className="relative w-32 h-32 mb-4">
                                <Image
                                    src={meal.image_url}
                                    alt={meal.name}
                                    fill
                                    className="object-cover rounded-full border"
                                />
                            </div>

                            <h3 className="font-bold text-lg text-gray-800">
                                {meal.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {meal.provider.restaurant_name}
                            </p>

                            <p className="text-orange-500 font-bold mt-2">
                                ৳{meal.price}
                            </p>

                            <Button
                                onClick={() => handleAddToCart(meal)}
                                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
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