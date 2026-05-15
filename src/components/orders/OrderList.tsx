"use client";

import React from "react";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

interface OrderItem {
    id: string;
    meal: { name: string; price: string };
    quantity: number;
    price_at_order: string;
}

interface Order {
    id: string;
    created_at: string;
    total_price: string;
    status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
    orderItems: OrderItem[];
}

const statusConfig = {
    PLACED: { color: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20", icon: Clock, label: "Placed" },
    PREPARING: { color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20", icon: Package, label: "Preparing" },
    READY: { color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20", icon: Package, label: "Ready" },
    DELIVERED: { color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20", icon: CheckCircle, label: "Delivered" },
    CANCELLED: { color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20", icon: XCircle, label: "Cancelled" },
};

export default function OrderList({ orders }: { orders: Order[] }) {
    if (orders.length === 0) {
        return (
            <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-xl dark:shadow-none border border-transparent dark:border-white/5 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">No orders yet</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium">You haven't placed any orders yet. Time to explore!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {orders.map((order) => {
                const config = statusConfig[order.status] || statusConfig.PLACED;
                const Icon = config.icon;
                const itemsCount = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);

                return (
                    <div
                        key={order.id}
                        className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[2rem] shadow-lg dark:shadow-none border border-transparent dark:border-white/5 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            {/* Left */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                                        Order <span className="text-gray-400 dark:text-gray-500">#{order.id.slice(0, 8)}</span>
                                    </h2>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest ${config.color}`}>
                                        <Icon size={14} />
                                        {config.label}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={16} />
                                        {new Date(order.created_at).toLocaleString(undefined, {
                                            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                                        })}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 hidden sm:block" />
                                    <span>🧾 {itemsCount} Items</span>
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-gray-100 dark:border-white/10 pt-4 md:pt-0 md:pl-6">
                                <div className="text-left md:text-right">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                    <p className="text-3xl font-black text-gray-900 dark:text-white">
                                        <span className="text-orange-500 mr-1 text-2xl">৳</span>{order.total_price}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    {order.status === "PLACED" && (
                                        <button className="w-full sm:w-auto px-6 py-3 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">
                                            Cancel
                                        </button>
                                    )}
                                    {(order.status === "DELIVERED" || order.status === "CANCELLED") && (
                                        <button className="w-full sm:w-auto px-6 py-3 bg-orange-50 dark:bg-orange-500/10 text-orange-500 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors">
                                            Reorder
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
