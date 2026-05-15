"use client";

import { useState } from "react";
import { Utensils, ShoppingBag, Clock, Banknote, MapPin, Store, Copy, Check, ExternalLink, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Provider = {
    id: string;
    restaurantName: string;
    address: string;
    is_active: boolean;
    totalMeals: number;
    totalOrders: number;
    activeOrders: number;
    totalRevenue: number;
};

export default function ProviderListManager({ initialProviders }: { initialProviders: Provider[] }) {
    const [providers, setProviders] = useState<Provider[]>(initialProviders);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            setUpdatingId(id);
            const newStatus = !currentStatus;
            
            setProviders((prev) =>
                prev.map((p) => (p.id === id ? { ...p, is_active: newStatus } : p))
            );

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/update-status/${id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ is_active: newStatus }),
                }
            );

            if (!response.ok) throw new Error("Update failed");
            toast.success(`${newStatus ? "Activated" : "Deactivated"} successfully`);
        } catch (err) {
            toast.error("Operation failed. Rollback initiated.");
            setProviders((prev) =>
                prev.map((p) => (p.id === id ? { ...p, is_active: currentStatus } : p))
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        toast.success("Identity key copied");
    };

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">Partner Governance</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Restaurant Partners</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Audit and regulate restaurant operations across the platform</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-2 px-6 py-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Active Fleet</p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{providers.length}</p>
                    </div>
                </div>
            </div>

            {/* Providers List */}
            <div className="grid grid-cols-1 gap-8">
                {providers.map((provider) => (
                    <div key={provider.id} className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl shadow-gray-200/20 dark:shadow-none hover:border-orange-500/30 dark:hover:border-orange-500/20 transition-all duration-500 overflow-hidden">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-8 border-b border-gray-50 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.01]">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/30 group-hover:rotate-6 transition-all duration-500">
                                    <Store className="w-10 h-10" />
                                </div>
                                <div className="space-y-1.5">
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none">{provider.restaurantName}</h2>
                                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-400">
                                        <span className="flex items-center gap-2"><MapPin size={14} className="text-orange-500" /> {provider.address}</span>
                                        <button
                                            onClick={() => handleCopy(provider.id)}
                                            className="flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-white/5 text-[10px] font-black tracking-widest hover:text-orange-500 transition-colors"
                                        >
                                            {copiedId === provider.id ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                                            {provider.id.slice(0, 8).toUpperCase()}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${provider.is_active ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {provider.is_active ? 'Online & Active' : 'System Offline'}
                                    </span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Operation Lock</span>
                                </div>
                                <ToggleSwitch
                                    active={provider.is_active}
                                    onToggle={() => handleToggleStatus(provider.id, provider.is_active)}
                                    loading={updatingId === provider.id}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-white/5">
                            <ProviderStat title="Service Menu" value={provider.totalMeals} icon={<Utensils size={18} />} color="text-orange-500" subtitle="Meals published" />
                            <ProviderStat title="Gross Orders" value={provider.totalOrders} icon={<ShoppingBag size={18} />} color="text-blue-500" subtitle="Lifetime transactions" />
                            <ProviderStat title="Queue Volume" value={provider.activeOrders} icon={<Clock size={18} />} color="text-purple-500" subtitle="Currently processing" />
                            <ProviderStat title="Net Revenue" value={`৳${provider.totalRevenue.toLocaleString()}`} icon={<Banknote size={18} />} color="text-emerald-500" subtitle="Platform earnings" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProviderStat({ title, value, icon, color, subtitle }: any) {
    return (
        <div className="p-8 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-all">
            <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</p>
                <div className={`${color} opacity-80`}>{icon}</div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{value}</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{subtitle}</p>
        </div>
    );
}

function ToggleSwitch({ active, onToggle, loading }: { active: boolean; onToggle: () => void; loading?: boolean }) {
    return (
        <button
            type="button"
            disabled={loading}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
            }}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-500 focus:outline-none ${
                loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${active ? 'bg-emerald-500 shadow-xl shadow-emerald-500/20' : 'bg-gray-200 dark:bg-zinc-800'}`}
        >
            <span
                className={`flex items-center justify-center h-6 w-6 transform rounded-full bg-white shadow-xl transition duration-500 ease-in-out ${
                    active ? 'translate-x-7' : 'translate-x-1'
                }`}
            >
                {loading && <Loader2 size={12} className="animate-spin text-orange-500" />}
            </span>
        </button>
    );
}
