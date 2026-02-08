"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const featuredMealsData = [
    { id: 1, name: "Margherita Pizza", price: 12, img: "/Margherita-Pizza.jpg" },
    { id: 2, name: "Cheeseburger", price: 10, img: "/Cheeseburger.jpg" },
    { id: 3, name: "Sushi Platter", price: 18, img: "/Sushi-Platter.jpg" },
    { id: 4, name: "Chocolate Cake", price: 8, img: "/Chocolate-Cake.jpg" },
];

const FeaturedMeals = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Featured Meals</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {featuredMealsData.map((meal) => (
                        <div key={meal.id} className="bg-gray-50 rounded-lg shadow hover:shadow-lg p-4 flex flex-col items-center">
                            <Image
                                src={meal.img}
                                alt={meal.name}
                                width={180}
                                height={180}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                            <h3 className="font-semibold text-gray-800">{meal.name}</h3>
                            <p className="text-gray-600 mt-1">${meal.price}</p>
                            <Button className="mt-3 bg-primary text-white px-4 py-1 rounded">
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
