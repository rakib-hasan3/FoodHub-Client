"use client";

import { useEffect, useState } from "react";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

interface Order {
    id: string;
    createdAt: string;
    total: number;
    status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
}

const statusConfig = {
    PLACED: {
        color: "text-yellow-600 bg-yellow-100",
        icon: Clock,
        label: "Placed",
    },
    PREPARING: {
        color: "text-blue-600 bg-blue-100",
        icon: Package,
        label: "Preparing",
    },
    READY: {
        color: "text-purple-600 bg-purple-100",
        icon: Package,
        label: "Ready",
    },
    DELIVERED: {
        color: "text-green-600 bg-green-100",
        icon: CheckCircle,
        label: "Delivered",
    },
    CANCELLED: {
        color: "text-red-600 bg-red-100",
        icon: XCircle,
        label: "Cancelled",
    },
};

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedOrders = JSON.parse(
                localStorage.getItem("myOrders") || "[]"
            );

            setOrders(storedOrders);
        } catch (err) {
            console.error("Failed to load orders", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <main className="min-h-screen mt-4 bg-gray-50/50 py-12">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-gray-900">My Orders</h1>
                    <p className="text-gray-500 mt-2">
                        Track and manage your recent orders
                    </p>
                </header>

                {loading ? (
                    <p className="text-center text-gray-400">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold text-lg">
                            😔 No orders yet
                        </p>
                        <p className="text-gray-400 mt-2">
                            Start ordering delicious meals!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const config = statusConfig[order.status];
                            const Icon = config.icon;

                            return (
                                <div
                                    key={order.id}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Left */}
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                Order #{order.id.slice(0, 8)}
                                            </h2>
                                            <p className="text-gray-500 text-sm">
                                                📅 {new Date(order.createdAt).toLocaleString()}
                                            </p>
                                            <p className="text-gray-900 font-semibold mt-1">
                                                💰 ৳ {order.total}
                                            </p>
                                        </div>

                                        {/* Right */}
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm ${config.color}`}
                                            >
                                                <Icon size={16} />
                                                {config.label}
                                            </span>

                                            {/* Actions */}
                                            {order.status === "PLACED" && (
                                                <button className="text-red-500 font-semibold hover:underline">
                                                    Cancel
                                                </button>
                                            )}

                                            {order.status === "DELIVERED" && (
                                                <button className="text-orange-500 font-semibold hover:underline">
                                                    Reorder
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}