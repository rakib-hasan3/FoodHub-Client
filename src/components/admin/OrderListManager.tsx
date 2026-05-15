"use client";

import { useState } from "react";
import { Eye, Clock, Package, MapPin, User, Calendar, ShoppingBag, ShieldCheck, X, ArrowRight, DollarSign } from "lucide-react";

export type Order = {
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

interface OrderListManagerProps {
    initialOrders: Order[];
}

export default function OrderListManager({ initialOrders }: OrderListManagerProps) {
    const [orders] = useState<Order[]>(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    return (
        <div className="space-y-10 max-w-[1400px] mx-auto pb-10">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <ShoppingBag className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">Transaction Registry</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Global Orders</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Audit platform transactions and fulfillment cycles</p>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="px-6 py-2 text-center border-r border-gray-100 dark:border-white/5">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Volume</p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{orders.length}</p>
                    </div>
                    <div className="px-6 py-2 text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Net Value</p>
                        <p className="text-2xl font-black text-orange-500 mt-1">৳{orders.reduce((acc, curr) => acc + parseFloat(curr.total_price), 0).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/10 dark:shadow-none border border-gray-100 dark:border-white/5 overflow-hidden transition-all">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5">
                            <tr>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Transaction ID</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Customer</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Value</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Lifecycle</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Timestamp</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500 text-right">Audit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-orange-50/30 dark:hover:bg-orange-500/[0.03] transition-all group">
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 dark:text-zinc-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-inner border border-transparent dark:border-white/5">
                                                <Package size={18} />
                                            </div>
                                            <span className="font-mono text-[10px] font-black tracking-widest text-gray-400 dark:text-gray-500">#{order.id.slice(0, 10).toUpperCase()}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                            <span className="text-sm font-black text-gray-700 dark:text-gray-300 truncate max-w-[150px]">{order.customer_id}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8 font-black text-gray-900 dark:text-white text-lg">
                                        <span className="text-orange-500 text-sm">৳</span>{parseFloat(order.total_price).toLocaleString()}
                                    </td>
                                    <td className="py-5 px-8"><StatusBadge status={order.status} /></td>
                                    <td className="py-5 px-8 font-bold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                        {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="py-5 px-8 text-right">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all active:scale-95"
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

            {/* Mobile View Cards */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="font-mono text-[10px] font-black text-orange-500 uppercase tracking-widest leading-none">#{order.id.slice(0, 8).toUpperCase()}</p>
                                <StatusBadge status={order.status} />
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Value</p>
                                <p className="text-xl font-black text-gray-900 dark:text-white leading-none">৳{order.total_price}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                            <User size={14} className="text-gray-400" />
                            <span className="text-xs font-black text-gray-600 dark:text-gray-400 truncate">{order.customer_id}</span>
                        </div>
                        <button
                            onClick={() => setSelectedOrder(order)}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                        >
                            View Audit Details <ArrowRight size={14} />
                        </button>
                    </div>
                ))}
            </div>

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
    const statusMap = {
        DELIVERED: { color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", icon: ShieldCheck },
        PLACED: { color: "text-blue-500 bg-blue-500/10 border-blue-500/20", icon: Package },
        PREPARING: { color: "text-orange-500 bg-orange-500/10 border-orange-500/20", icon: Clock },
        READY: { color: "text-purple-500 bg-purple-500/10 border-purple-500/20", icon: Package },
        CANCELLED: { color: "text-rose-500 bg-rose-500/10 border-rose-500/20", icon: X },
    };
    
    const config = statusMap[status as keyof typeof statusMap] || { color: "text-gray-500 bg-gray-500/10 border-gray-500/20", icon: Clock };
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${config.color}`}>
            <Icon size={10} />
            {status}
        </span>
    );
}

function OrderModal({ order, onClose }: { order: Order; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
            
            <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-transparent dark:border-white/5">
                
                {/* Modal Header */}
                <div className="p-8 border-b border-gray-50 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/[0.01]">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                                <Package size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Audit Log</h2>
                                <p className="font-mono text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">#{order.id.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 text-gray-400 hover:text-orange-500 transition-all border border-gray-100 dark:border-white/10">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {/* Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InfoItem icon={User} label="Customer ID" value={order.customer_id} isMono />
                        <InfoItem icon={Clock} label="Operational Lifecycle" value={<StatusBadge status={order.status} />} />
                        <InfoItem icon={Calendar} label="Transaction Date" value={new Date(order.created_at).toLocaleString()} />
                        <InfoItem icon={MapPin} label="Logistics Target" value={order.delivery_address} />
                    </div>

                    {/* Order Manifest */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <ShoppingBag size={16} className="text-orange-500" />
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Manifest</h3>
                        </div>
                        <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl p-6 space-y-4">
                            {order.orderItems.map((item, i) => (
                                <div key={i} className="flex justify-between items-center group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white dark:bg-zinc-800 rounded-lg flex items-center justify-center font-black text-[10px] border border-gray-100 dark:border-white/5">
                                            {item.quantity}
                                        </div>
                                        <span className="text-sm font-black text-gray-700 dark:text-gray-300">{item.meal.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-900 dark:text-white">৳{parseFloat(item.price_at_order).toLocaleString()}</span>
                                </div>
                            ))}
                            
                            <div className="pt-6 mt-2 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-orange-500">
                                    <DollarSign size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Net Value</span>
                                </div>
                                <span className="text-3xl font-black text-gray-900 dark:text-white">৳{parseFloat(order.total_price).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-gray-50 dark:bg-black/20 flex gap-4">
                    <button onClick={onClose} className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/10">
                        Exit Audit
                    </button>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value, isMono }: any) {
    return (
        <div className="flex gap-4 group">
            <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-gray-400 group-hover:text-orange-500 transition-colors h-fit">
                <Icon size={18} />
            </div>
            <div className="space-y-1 min-w-0">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
                <div className={`text-sm font-black text-gray-800 dark:text-gray-200 tracking-tight leading-tight break-all ${isMono ? 'font-mono text-xs' : ''}`}>
                    {value}
                </div>
            </div>
        </div>
    );
}