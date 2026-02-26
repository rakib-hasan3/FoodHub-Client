"use client";

import MealsGrid from "@/components/dashboard/MealsGrid";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Meal = {
    id: string;
    name: string;
    status: string;
    price: string;
    description: string;
    image_url: string;
    category: {
        id: string;
        name: string;
    };
};

const MyMealsPage = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const providerId = session?.user?.id;

    useEffect(() => {
        const fetchMeals = async () => {
            if (!providerId) return;

            try {
                setLoading(true);

                const res = await fetch(
                    `http://localhost:5000/api/meals/my-meals/${providerId}`,
                    { cache: "no-store" }
                );

                const data = await res.json();

                if (data.success) {
                    setMeals(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch meals", error);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending) fetchMeals();
    }, [providerId, isPending]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">My Meals</h1>

                <button
                    onClick={() => router.push("/provider/AddMealModal")}
                    className="px-4 py-2 bg-black text-white rounded-xl"
                >
                    + Add Meal
                </button>
            </div>

            <MealsGrid meals={meals} loading={loading} />
        </div>
    );
};

export default MyMealsPage;