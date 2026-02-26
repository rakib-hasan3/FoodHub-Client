"use client";

import StatCard from "@/components/dashboard/StatCard";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";


type Meal = {
  id: string;
  status: string;
  price: string;
};

const DashboardPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();
  const providerId = session?.user?.id;

  useEffect(() => {
    const fetchStats = async () => {
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
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isPending) fetchStats();
  }, [providerId, isPending]);

  const totalMeals = meals.length;
  const availableMeals = meals.filter(
    (meal) => meal.status === "AVAILABLE"
  ).length;
  const unavailableMeals = meals.filter(
    (meal) => meal.status !== "AVAILABLE"
  ).length;

  const revenue = meals.reduce(
    (sum, meal) => sum + Number(meal.price),
    0
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard title="Total Meals" value={totalMeals} />
          <StatCard title="Available" value={availableMeals} />
          <StatCard title="Unavailable" value={unavailableMeals} />
          <StatCard title="Revenue" value={`৳ ${revenue}`} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;