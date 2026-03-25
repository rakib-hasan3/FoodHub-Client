"use client";

import { useEffect, useState } from "react";
import { Eye, Clock, Package, MapPin, User, Calendar } from "lucide-react"; // আইকন যোগ করা হয়েছে

// ... (টাইপ ডেফিনিশন আগের মতোই থাকবে)
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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/order-management/orders`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setOrders(data.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex justify-center items-center h-64 text-gray-500">Loading Orders...</div>;

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders Management 📦</h1>

            {/* --- Mobile View (Cards) --- */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-mono text-xs font-bold text-blue-600">#{order.id.slice(0, 8)}</span>
                            <StatusBadge status={order.status} />
                        </div>
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <User size={14} /> <span>{order.customer_id.slice(0, 15)}...</span>
                            </div>
                            <div className="flex items-center gap-2 font-semibold text-gray-900">
                                <span className="text-blue-600">${order.total_price}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedOrder(order)}
                            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* --- Desktop View (Table) --- */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 border-b">
                            <tr>
                                <th className="py-4 px-4 font-semibold">Order ID</th>
                                <th className="py-4 px-4 font-semibold">User</th>
                                <th className="py-4 px-4 font-semibold">Total</th>
                                <th className="py-4 px-4 font-semibold">Status</th>
                                <th className="py-4 px-4 font-semibold">Date</th>
                                <th className="py-4 px-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="py-4 px-4 font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</td>
                                    <td className="py-4 px-4">{order.customer_id.slice(0, 10)}...</td>
                                    <td className="py-4 px-4 font-bold text-gray-900">${order.total_price}</td>
                                    <td className="py-4 px-4"><StatusBadge status={order.status} /></td>
                                    <td className="py-4 px-4 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="py-4 px-4 text-right">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2 hover:bg-white rounded-full text-blue-600 shadow-sm border border-transparent hover:border-blue-100 transition-all"
                                        >
                                            <Eye size={18} />
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
    const colors = {
        DELIVERED: "bg-green-100 text-green-700",
        PREPARING: "bg-yellow-100 text-yellow-700",
        CANCELLED: "bg-red-100 text-red-700",
        DEFAULT: "bg-gray-100 text-gray-700"
    };
    const colorClass = colors[status as keyof typeof colors] || colors.DEFAULT;

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colorClass}`}>
            {status}
        </span>
    );
}

// Modal Section (Responsive Fix)
function OrderModal({ order, onClose }: { order: Order; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Order Details <span className="text-sm font-normal text-gray-400">#{order.id.slice(0, 8)}</span>
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">✕</button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <User className="text-blue-500 mt-1" size={18} />
                            <div><p className="text-gray-400">Customer ID</p><p className="font-medium break-all">{order.customer_id}</p></div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="text-blue-500 mt-1" size={18} />
                            <div><p className="text-gray-400">Order Status</p><StatusBadge status={order.status} /></div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="text-blue-500 mt-1" size={18} />
                            <div><p className="text-gray-400">Date</p><p className="font-medium">{new Date(order.created_at).toLocaleString()}</p></div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="text-blue-500 mt-1" size={18} />
                            <div><p className="text-gray-400">Delivery Address</p><p className="font-medium">{order.delivery_address}</p></div>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div>
                        <h3 className="font-bold mb-3 flex items-center gap-2"><Package size={18} /> Ordered Items</h3>
                        <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                            {order.orderItems.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-sm border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                                    <span>{item.meal.name} <span className="text-gray-400 ml-1">× {item.quantity}</span></span>
                                    <span className="font-bold text-gray-800">${item.price_at_order}</span>
                                </div>
                            ))}
                            <div className="pt-2 flex justify-between items-center text-lg font-black text-blue-600">
                                <span>Total Price</span>
                                <span>${order.total_price}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50">
                    <button onClick={onClose} className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}