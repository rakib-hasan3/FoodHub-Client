"use client";

import { useState } from "react";
import { Utensils, Store, Tag, Activity, MoreHorizontal, ShieldCheck, Trash2, Edit3, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Meal = {
    id: string;
    name: string;
    price: string;
    status: string;
    image_url: string;
    provider: {
        restaurant_name: string;
    };
    category: {
        name: string;
    };
};

export default function MealListManager({ initialMeals }: { initialMeals: Meal[] }) {
    const [meals, setMeals] = useState<Meal[]>(initialMeals);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    const refreshMeals = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`);
        const data = await res.json();
        setMeals(data.data || []);
    };

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <Utensils className="w-5 h-5 text-orange-500" />
                        </div>
                        <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.2em]">Inventory Control</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Meal Catalog</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Manage global menu items and provider offerings</p>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="px-6 py-2 text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Catalog Size</p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{meals.length}</p>
                    </div>
                </div>
            </div>

            {/* Desktop View Table */}
            <div className="hidden lg:block bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/10 dark:shadow-none border border-gray-100 dark:border-white/5 overflow-hidden transition-all">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5">
                            <tr>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Meal Identity</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Provider</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Classification</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Financials</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                            {meals.map((meal) => (
                                <tr key={meal.id} className="hover:bg-orange-50/30 dark:hover:bg-orange-500/[0.03] transition-all group">
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-inner border border-gray-200 dark:border-white/10 group-hover:scale-105 transition-transform duration-500">
                                                {meal.image_url ? (
                                                    <img src={meal.image_url} alt={meal.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <Utensils size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-black text-gray-900 dark:text-white tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{meal.name}</p>
                                                <StatusBadge status={meal.status} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-2">
                                            <Store size={14} className="text-blue-500" />
                                            <span className="text-sm font-black text-gray-700 dark:text-gray-300">{meal.provider.restaurant_name}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full w-fit">
                                            <Tag size={12} className="text-orange-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">{meal.category.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-1 font-black text-gray-900 dark:text-white text-lg">
                                            <span className="text-orange-500 text-sm">৳</span>
                                            {parseFloat(meal.price).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setSelectedMeal(meal)}
                                                className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all active:scale-95"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile View Cards */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
                {meals.map((meal) => (
                    <div key={meal.id} className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-100 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-inner border border-gray-200 dark:border-white/10">
                                    <img src={meal.image_url} alt={meal.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 dark:text-white leading-tight">{meal.name}</h3>
                                    <StatusBadge status={meal.status} />
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedMeal(meal)}
                                className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-orange-500"
                            >
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-transparent dark:border-white/5">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Provider</p>
                                <p className="text-xs font-black text-gray-900 dark:text-white truncate">{meal.provider.restaurant_name}</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-transparent dark:border-white/5">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                                <p className="text-xs font-black text-gray-900 dark:text-white">৳{meal.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedMeal && (
                <ManageMealModal
                    meal={selectedMeal}
                    onClose={() => {
                        setSelectedMeal(null);
                        refreshMeals();
                    }}
                />
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const isAvailable = status === "AVAILABLE";
    return (
        <span className={`inline-flex items-center gap-1 mt-1 text-[9px] font-black uppercase tracking-widest ${isAvailable ? "text-emerald-500" : "text-rose-500"}`}>
            <Activity size={10} />
            {status}
        </span>
    );
}

function ManageMealModal({ meal, onClose }: { meal: Meal; onClose: () => void; }) {
    const [status, setStatus] = useState(meal.status);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals/${meal.id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error("Update failed");
            toast.success("Meal status updated successfully");
            onClose();
        } catch (err) {
            toast.error("System sync failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Confirm complete removal of this culinary asset?")) return;
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals/${meal.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");
            toast.success("Meal removed from ecosystem");
            onClose();
        } catch (err) {
            toast.error("Deletion protocol failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
            <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="relative h-40 bg-gray-100 dark:bg-zinc-800">
                    <img src={meal.image_url} alt={meal.name} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent" />
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all">
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{meal.name}</h2>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{meal.provider.restaurant_name}</p>
                    </div>
                </div>
                <div className="p-8 space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Operational Status</label>
                        <div className="grid grid-cols-2 gap-3">
                            {["AVAILABLE", "UNAVAILABLE"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStatus(s)}
                                    className={`px-4 py-3 rounded-2xl text-xs font-black tracking-widest border transition-all ${
                                        status === s 
                                        ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" 
                                        : "bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400"
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleStatusChange}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 shadow-xl"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <ShieldCheck size={16} />}
                            Sync Update
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 bg-red-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 shadow-xl shadow-red-500/20"
                        >
                            <Trash2 size={16} />
                            Decommission
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
