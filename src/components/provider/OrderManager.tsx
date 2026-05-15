"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Package, Clock, CheckCircle, ChefHat, User, MapPin } from "lucide-react";

type Order = {
    id: string;
    customer_name: string;
    customer_email: string;
    delivery_address: string;
    status: "PLACED" | "PREPARING" | "READY" | "DELIVERED";
    total: number;
    items: { name: string; quantity: number; price: string }[];
    createdAt: string;
};

const statusConfig = {
    PLACED: {
        color: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20",
        icon: Clock,
        label: "Placed",
    },
    PREPARING: {
        color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-100/10",
        icon: ChefHat,
        label: "Preparing",
    },
    READY: {
        color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20",
        icon: Package,
        label: "Ready",
    },
    DELIVERED: {
        color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20",
        icon: CheckCircle,
        label: "Delivered",
    },
};

const filterLabels: Record<string, string> = {
    ALL: "All Orders",
    PLACED: "Placed",
    PREPARING: "Preparing",
    READY: "Ready",
    DELIVERED: "Delivered",
};

export default function OrderManager({ initialOrders }: { initialOrders: Order[] }) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [filter, setFilter] = useState<string>("ALL");

    const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/orders/${orderId}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus }),
                }
            );
            const data = await res.json();
            if (data.success) {
                toast.success("Status updated!");
                setOrders((prev) =>
                    prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
                );
            } else {
                toast.error(data.message || "Failed to update status");
            }
        } catch (err) {
            console.error("Backend error:", err);
            toast.error("Error updating status");
        }
    };

    const filteredOrders = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

    return (
        <div className="space-y-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {["ALL", "PLACED", "PREPARING", "READY", "DELIVERED"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filter === status
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                            : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-white/5 hover:border-orange-500/30"
                            }`}
                    >
                        {filterLabels[status]}
                    </button>
                ))}
            </div>

            {/* Orders Grid */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-xl dark:shadow-none border border-transparent dark:border-white/5 max-w-2xl mx-auto">
                    <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No orders found</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        {filter === "ALL" ? "You have no incoming orders yet." : `No orders with status "${filter}".`}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredOrders.map((order) => {
                        const config = statusConfig[order.status];
                        const Icon = config.icon;

                        return (
                            <div
                                key={order.id}
                                className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-lg dark:shadow-none border border-transparent dark:border-white/5 hover:border-orange-500/30 dark:hover:border-orange-500/20 transition-all duration-300 flex flex-col overflow-hidden group"
                            >
                                {/* Card Header */}
                                <div className="p-5 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Order</p>
                                        <h2 className="font-black text-gray-900 dark:text-white text-lg tracking-tight">#{order.id.slice(0, 8)}</h2>
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-xs uppercase tracking-widest ${config.color}`}>
                                        <Icon size={13} />
                                        {config.label}
                                    </span>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 flex-1 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                            <User size={16} className="text-orange-500" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-black text-gray-900 dark:text-white truncate">{order.customer_name}</p>
                                            <p className="text-xs text-gray-400 truncate">{order.customer_email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin size={16} className="text-red-500" />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 line-clamp-2">{order.delivery_address}</p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-3 space-y-1.5">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-sm">
                                                <span className="font-semibold text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
                                                <span className="font-black text-gray-900 dark:text-white ml-2 flex-shrink-0">×{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total</p>
                                            <p className="text-2xl font-black text-gray-900 dark:text-white">
                                                <span className="text-orange-500 text-lg mr-0.5">৳</span>{order.total.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                {new Date(order.createdAt).toLocaleString(undefined, {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Updater */}
                                <div className="p-4 border-t border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Update Status</p>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                                        className="w-full h-11 px-4 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-900 dark:text-white focus:border-orange-500/50 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="PLACED">📋 Placed</option>
                                        <option value="PREPARING">👨‍🍳 Preparing</option>
                                        <option value="READY">✅ Ready</option>
                                        <option value="DELIVERED">🚀 Delivered</option>
                                    </select>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
