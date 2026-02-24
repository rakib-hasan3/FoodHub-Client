"use client";

import React, { useState, useEffect } from "react";

const ProviderDashboard = () => {
    // ১. স্টেট ডিক্লেয়ার করা
    const [statsData, setStatsData] = useState({
        totalEarnings: 0,
        activeMeals: 0,
        pendingOrders: 0,
        totalReviews: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // ২. আপনার ব্যাকএন্ড এপিআই কল (প্রয়োজনে প্রোভাইডার আইডি পাঠাতে হতে পারে)
                const response = await fetch("http://localhost:5000/api/provider/stats");
                const result = await response.json();

                if (result.success) {
                    setStatsData({
                        totalEarnings: result.data.totalEarnings || 0,
                        activeMeals: result.data.activeMeals || 0,
                        pendingOrders: result.data.pendingOrders || 0,
                        totalReviews: result.data.totalReviews || 0
                    });
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // ৩. স্ট্যাটস অ্যারে তৈরি (ডাইনামিক ভ্যালু দিয়ে)
    const stats = [
        { title: "Total Earnings", value: `৳${statsData.totalEarnings.toLocaleString()}`, color: "text-green-600" },
        { title: "Active Meals", value: statsData.activeMeals.toString().padStart(2, '0'), color: "text-blue-600" },
        { title: "Pending Orders", value: statsData.pendingOrders.toString().padStart(2, '0'), color: "text-orange-600" },
        { title: "Total Reviews", value: statsData.totalReviews.toString().padStart(2, '0'), color: "text-purple-600" },
    ];

    if (loading) return <div className="p-10 text-center">Loading Stats...</div>;

    return (
        <div className="flex bg-zinc-50 min-h-screen">
            <main className="flex-grow w-full p-4 items-center">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
                        <p className="text-gray-500">{"Here's what's happening with your store today."}</p>
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition">
                        + Add New Meal
                    </button>
                </header>

                {/* Stats Cards - এখন এগুলো ডাইনামিক */}
                <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                            <h3 className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Recent Orders</h3>
                    <div className="text-center py-10 text-gray-400">
                        No new orders in the last 24 hours.
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProviderDashboard;