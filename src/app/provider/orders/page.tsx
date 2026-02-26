"use client";

import { authClient } from "@/lib/auth-client";
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
    const { data: session, isPending } = authClient.useSession(); // ✅ session
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("ALL");

    const providerUserId = session?.user?.id; // ✅ primitive id

    useEffect(() => {
        const fetchOrders = async () => {
            if (!providerUserId) return; // wait for session

            try {
                setLoading(true);
                const res = await fetch("http://localhost:5000/api/provider/orders", {
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
    }, [providerUserId]); // ✅ primitive dependency

    // Update order status
    const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
        if (!providerUserId) return;
        try {
            const res = await fetch(
                `http://localhost:5000/api/provider/orders/${orderId}/status`,
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
        <div className="p-4 space-y-6 flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">Orders</h1>

            {/* Filters */}
            <div className="flex gap-2">
                {["ALL", "PLACED", "PREPARING", "READY", "DELIVERED"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-3 py-1 rounded-lg text-sm border ${filter === status ? "bg-gray-900 text-black" : "bg-white hover:bg-gray-300"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Orders */}
            {loading ? (
                <p>Loading orders...</p>
            ) : filteredOrders.length === 0 ? (
                <p>No orders found 😢</p>
            ) : (
                <div className="grid grid-cols-2 w-full justify-center items-center md:grid-cols-2 xl:grid-cols-2 gap-4">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white max-w-7xl p-4 rounded-lg shadow p-3 space-y-2 text-sm"
                        >
                            <div className="flex justify-between  items-center">
                                <h2 className="font-semibold text-sm truncate">
                                    Order #{order.id.slice(0, 8)}
                                </h2>
                                <StatusBadge status={order.status} />
                            </div>

                            <div className="text-gray-600">
                                <p>👤 {order.customer_name}</p>
                                <p>🧾 Items: {order.itemsCount}</p>
                                <p>💰 Total: ৳ {order.total}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>

                            {/* Dropdown for status update */}
                            <select
                                value={order.status}
                                onChange={(e) =>
                                    updateOrderStatus(order.id, e.target.value as Order["status"])
                                }
                                className="w-full border rounded px-2 py-1 text-xs"
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
        PLACED: "bg-yellow-100 text-yellow-700",
        PREPARING: "bg-blue-100 text-blue-700",
        READY: "bg-purple-100 text-purple-700",
        DELIVERED: "bg-green-100 text-green-700",
    };
    return (
        <span
            className={`text-xs px-2 py-0.5 rounded-md font-medium ${colors[status]}`}
        >
            {status}
        </span>
    );
};

export default OrdersPage;