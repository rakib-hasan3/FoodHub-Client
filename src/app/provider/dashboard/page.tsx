"use client";

import StatCard from "@/components/dashboard/StatCard";
import { authClient } from "../../../../auth-client";
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/meals/my-meals/${providerId}`,
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
    <div className="p-4 md:p-8 space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-green-500 text-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">
          👋 Welcome back!
        </h1>
        <p className="text-sm opacity-90 mt-1">
          Here is an overview of your food business performance
        </p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading dashboard...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total Meals */}
          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <p className="text-sm text-gray-500">Total Meals</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {totalMeals}
            </h2>
          </div>

          {/* Available */}
          <div className="bg-green-50 p-5 rounded-2xl shadow hover:shadow-lg transition">
            <p className="text-sm text-green-600">Available Meals</p>
            <h2 className="text-2xl font-bold text-green-700">
              {availableMeals}
            </h2>
          </div>

          {/* Unavailable */}
          <div className="bg-red-50 p-5 rounded-2xl shadow hover:shadow-lg transition">
            <p className="text-sm text-red-600">Unavailable Meals</p>
            <h2 className="text-2xl font-bold text-red-700">
              {unavailableMeals}
            </h2>
          </div>

          {/* Revenue */}
          <div className="bg-orange-50 p-5 rounded-2xl shadow hover:shadow-lg transition">
            <p className="text-sm text-orange-600">Total Revenue</p>
            <h2 className="text-2xl font-bold text-orange-700">
              ৳ {revenue}
            </h2>
          </div>

        </div>
      )}

      {/* Extra Section */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold text-gray-700 mb-2">
          📊 Quick Insight
        </h3>
        <p className="text-sm text-gray-500">
          You currently have {availableMeals} active meals out of {totalMeals} total meals.
        </p>
      </div>

    </div>
  );
};

export default DashboardPage;