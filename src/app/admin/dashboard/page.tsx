"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/admin/layout";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type Stats = {
    totalUsers: number;
    totalProviders: number;
    totalMeals: number;
    totalOrders: number;
    totalRevenue: number;
    ordersByStatus: { status: string; _count: { _all: number } }[];
};

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/order-management/dashboard-stats`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Dashboard stats:", data.stats);
                setStats(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading)
        return <div className="p-6 text-gray-500">Loading Dashboard...</div>;

    if (!stats)
        return <div className="p-6 text-red-500">Failed to load dashboard.</div>;

    const chartData = (stats?.ordersByStatus || []).map((item) => ({
        status: item.status,
        count: item._count._all,
    }));

    return (
        <div className="">
            <h1 className="text-3xl text-center font-bold ">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8 mt-4">
                <StatCard title="Total Users" value={stats.totalUsers} />
                <StatCard title="Providers" value={stats.totalProviders} />
                <StatCard title="Meals" value={stats.totalMeals} />
                <StatCard title="Orders" value={stats.totalOrders} />
                <StatCard title="Revenue" value={`$${stats.totalRevenue}`} />
            </div>

            {/* Orders by Status Chart */}
            <div className="p-4 bg-white rounded shadow h-80">
                <h3 className="text-gray-700 mb-4 font-semibold">
                    Orders by Status
                </h3>

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="status" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#16a34a" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

/* Reusable Card */
function StatCard({
    title,
    value,
}: {
    title: string;
    value: string | number;
}) {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h3 className="text-gray-500">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}
