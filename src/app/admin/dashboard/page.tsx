"use client";

import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
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

    const chartData = (stats.ordersByStatus || []).map((item) => ({
        status: item.status,
        count: item._count._all,
    }));

    return (
        <div>
            {/* Title */}
            <h1 className="text-3xl text-center font-bold mb-6">
                📊 Admin Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                <StatCard title="Total Users" value={stats.totalUsers} />
                <StatCard title="Providers" value={stats.totalProviders} />
                <StatCard title="Meals" value={stats.totalMeals} />
                <StatCard title="Orders" value={stats.totalOrders} />
                <StatCard title="Revenue" value={`$${stats.totalRevenue}`} />
            </div>

            {/* Chart */}
            <div className="p-6 bg-white rounded-2xl shadow-sm border h-80">
                <h3 className="text-gray-800 mb-4 font-semibold text-lg">
                    Orders by Status
                </h3>

                {chartData.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        No orders yet
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} />

                            <XAxis
                                dataKey="status"
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                            />

                            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.status === "DELIVERED"
                                                ? "#22c55e"
                                                : entry.status === "PENDING"
                                                    ? "#facc15"
                                                    : entry.status === "CANCELLED"
                                                        ? "#ef4444"
                                                        : "#3b82f6"
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

/* Modern Stat Card */
function StatCard({
    title,
    value,
}: {
    title: string;
    value: string | number;
}) {
    return (
        <div className="p-5 bg-white rounded-2xl border shadow-sm hover:shadow-md transition">
            <h3 className="text-gray-500 text-sm">{title}</h3>
            <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
        </div>
    );
}