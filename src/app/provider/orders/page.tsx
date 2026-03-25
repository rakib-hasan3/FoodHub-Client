"use client";

import { authClient } from "../../../../auth-client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// API response type
type ApiOrderItem = {
    id: string;
    quantity: number;
    price_at_order: string;
    ordersId: string;
    orders: {
        id: string;
        customer_id: string;
        delivery_address: string;
        total_price: string;
        status: "PLACED" | "PREPARING" | "READY" | "DELIVERED";
        created_at: string;
    };
    meal: { name: string; price: string };
    customer: { name: string; email: string };
};

// UI Order type
type Order = {
    id: string;
    customer_name: string;
    status: "PLACED" | "PREPARING" | "READY" | "DELIVERED";
    total: number;
    itemsCount: number;
    createdAt: string;
};

const OrdersPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("ALL");

    const providerUserId = session?.user?.id;

    useEffect(() => {
        const fetchOrders = async () => {
            if (!providerUserId) return;
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/orders`, {
                    cache: "no-store",
                    credentials: "include",
                });
                const data: { success: boolean; data: ApiOrderItem[] } = await res.json();

                if (data.success) {
                    const formattedOrders: Order[] = data.data.map((item) => ({
                        id: item.orders.id,
                        customer_name: item.customer.name,
                        status: item.orders.status,
                        total: Number(item.orders.total_price),
                        itemsCount: item.quantity,
                        createdAt: item.orders.created_at,
                    }));
                    setOrders(formattedOrders);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [providerUserId]);

    const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
        if (!providerUserId) return;
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/orders/${orderId}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus, providerUserId }),
                }
            );
            const data = await res.json();
            if (data.success) {
                toast.success("Status updated!");
                setOrders((prev) =>
                    prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
                );
            } else {
                toast.error("Failed to update status");
            }
        } catch (err) {
            console.error("Backend error:", err);
            toast.error("Error updating status");
        }
    };

    const filteredOrders =
        filter === "ALL" ? orders : orders.filter((order) => order.status === filter);

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

            <h1 className="text-2xl font-bold text-gray-800">Orders</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                {["ALL", "PLACED", "PREPARING", "READY", "DELIVERED"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition 
                        ${filter === status
                                ? "bg-blue-600 text-white shadow"
                                : "bg-white text-gray-700 border hover:bg-gray-100"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Orders */}
            {loading ? (
                <p className="text-center text-gray-500 py-10">Loading orders...</p>
            ) : filteredOrders.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No orders found 😢</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
                        >
                            {/* Order Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="font-semibold text-gray-800 truncate text-sm">
                                    Order #{order.id.slice(0, 8)}
                                </h2>
                                <StatusBadge status={order.status} />
                            </div>

                            {/* Order Info */}
                            <div className="text-gray-600 text-sm space-y-1 mb-3">
                                <p>👤 {order.customer_name}</p>
                                <p>🧾 Items: {order.itemsCount}</p>
                                <p>💰 Total: ৳ {order.total}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>

                            {/* Status Dropdown */}
                            <select
                                value={order.status}
                                onChange={(e) =>
                                    updateOrderStatus(order.id, e.target.value as Order["status"])
                                }
                                className="w-full border border-gray-200 rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-blue-200 focus:border-blue-400"
                            >
                                <option value="PLACED">PLACED</option>
                                <option value="PREPARING">PREPARING</option>
                                <option value="READY">READY</option>
                                <option value="DELIVERED">DELIVERED</option>
                            </select>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const StatusBadge = ({ status }: { status: Order["status"] }) => {
    const colors = {
        PLACED: "bg-yellow-100 text-yellow-800",
        PREPARING: "bg-blue-100 text-blue-800",
        READY: "bg-purple-100 text-purple-800",
        DELIVERED: "bg-green-100 text-green-800",
    };
    return (
        <span
            className={`text-xs px-2 py-0.5 rounded-md font-semibold ${colors[status]}`}
        >
            {status}
        </span>
    );
};

export default OrdersPage;