"use client";

import { useEffect, useState } from "react";

type Order = {
    id: string;
    customer_id: string;
    delivery_address: string;
    total_price: string;
    status: string;
    created_at: string;
    orderItems: {
        quantity: number;
        price_at_order: string;
        meal: {
            name: string;
            price: string;
        };
    }[];
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/admin/order-management/orders", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setOrders(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading)
        return <div className="p-6 text-gray-500">Loading Orders...</div>;

    return (
        <div className="p-4 sm:p-4">
            <h1 className="text-xl text-center p-4 sm:text-2xl font-bold mb-4 sm:mb-6">
                Orders Management 📦
            </h1>

            {/* ✅ Responsive wrapper */}
            <div className="bg-white rounded-xl shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-[800px] text-center w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left">Order ID</th>
                                <th className="py-3 px-4 text-left">User</th>
                                <th className="py-3 px-4 text-left">Items</th>
                                <th className="py-3 px-4 text-left">Total</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-3 text-center px-4 font-mono text-xs">
                                        {order.id.slice(0, 8)}...
                                    </td>

                                    <td className="py-3 px-4">
                                        {order.customer_id}
                                    </td>

                                    <td className="py-3 px-4">
                                        {order.orderItems
                                            .map(
                                                (item) =>
                                                    `${item.meal.name} (${item.quantity})`
                                            )
                                            .join(", ")}
                                    </td>

                                    <td className="py-3 px-4 font-semibold">
                                        ${order.total_price}
                                    </td>

                                    <td className="py-3 px-4">
                                        <StatusBadge status={order.status} />
                                    </td>

                                    <td className="py-3 px-4">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>

                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="px-3 py-1 text-xs  text-black rounded hover:opacity-80"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ✅ Modal */}
            {selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const color =
        status === "DELIVERED"
            ? "bg-green-500"
            : status === "PREPARING"
                ? "bg-yellow-500"
                : status === "CANCELLED"
                    ? "bg-red-500"
                    : "bg-gray-500";

    return (
        <span
            className={`px-2 py-1 rounded-full text-black text-xs ${color}`}
        >
            {status}
        </span>
    );
}

function OrderModal({
    order,
    onClose,
}: {
    order: Order;
    onClose: () => void;
}) {
    return (
        <div className="fixed  inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-lg p-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">
                        Order Details 🧾
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-2  text-sm">
                    <p><b>Order ID:</b> {order.id}</p>
                    <p><b>User:</b> {order.customer_id}</p>
                    <p><b>Status:</b> {order.status}</p>
                    <p><b>Total:</b> ${order.total_price}</p>
                    <p><b>Address:</b> {order.delivery_address}</p>
                    <p>
                        <b>Date:</b>{" "}
                        {new Date(order.created_at).toLocaleString()}
                    </p>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Items</h3>

                    <div className="space-y-2">
                        {order.orderItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                            >
                                <span>
                                    {item.meal.name} × {item.quantity}
                                </span>
                                <span>${item.price_at_order}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-5 w-full py-2  text-black rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
