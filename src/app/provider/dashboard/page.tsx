"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Meal = {
    id: string;
    name: string;
    status: string;
    price: string;
    image_url: string;
    category: {
        id: string;
        name: string;
    };
};

const DashboardPage = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const providerId = "0582f17a-b70d-41a6-81d5-92d4a53a6390"; // later dynamic

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/meals/my-meals/${providerId}`
                );
                console.log(providerId);
                const data = await res.json();
                setMeals(data.data);
            } catch (error) {
                console.error("Failed to fetch meals", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    // ✅ Stats calculations
    const totalMeals = meals.length;
    const availableMeals = meals.filter(
        (meal) => meal.status === "AVAILABLE"
    ).length;
    const unavailableMeals = meals.filter(
        (meal) => meal.status !== "AVAILABLE"
    ).length;

    // ✅ Demo Revenue calc (fake logic এখন)
    const revenue = meals.reduce(
        (sum, meal) => sum + Number(meal.price),
        0
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Provider Dashboard</h1>

                <button
                    onClick={() => router.push("/provider/AddMealModal")}
                    className="px-4 py-2 text-black rounded-xl hover:opacity-80"
                >
                    + Add Meal
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Total Meals" value={totalMeals} />
                <StatCard title="Available" value={availableMeals} />
                <StatCard title="Unavailable" value={unavailableMeals} />
                <StatCard title="Revenue" value={`৳ ${revenue}`} />
            </div>

            {/* Meals */}
            <div>
                <h2 className="text-xl font-semibold mb-3">My Meals</h2>

                {loading ? (
                    <p>Loading meals...</p>
                ) : meals.length === 0 ? (
                    <p>No meals found 😢</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {meals.map((meal) => (
                            <div
                                key={meal.id}
                                className="bg-white rounded-xl shadow hover:shadow-md transition"
                            >
                                <img
                                    src={meal.image_url}
                                    alt={meal.name}
                                    className="w-full h-28 object-cover rounded-t-xl"
                                />

                                <div className="p-4 space-y-1">
                                    <h3 className="text-sm font-semibold truncate">
                                        {meal.name}
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        {meal.category.name}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">
                                            ৳ {meal.price}
                                        </p>

                                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-md">
                                            {meal.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({
    title,
    value,
}: {
    title: string;
    value: string | number;
}) => (
    <div className="p-4 bg-white rounded-2xl shadow">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
    </div>
);

export default DashboardPage;