"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, ShoppingBag, Clock, Banknote, MapPin, Store, Copy, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function AdminProvidersDashboard() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/dashboard-stats`, {
                method: "GET",
                credentials: "include",
            });
            const result = await response.json();
            if (result.success) setProviders(result.data);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        console.log("Attempting to toggle ID:", id, "Current:", currentStatus);

        try {
            const newStatus = !currentStatus;
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

            // ১. অপটিমিস্টিক আপডেট (ক্লিক করার সাথে সাথে ইউআই চেঞ্জ হবে)
            setProviders((prev) =>
                prev.map((p) => (p.id === id ? { ...p, is_active: newStatus } : p))
            );

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/update-status/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    credentials: "include",
                    body: JSON.stringify({ is_active: newStatus }),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                // ২. যদি সার্ভারে এরর হয়, তবে আগের স্টেটে ফেরত যাবে
                setProviders((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, is_active: currentStatus } : p))
                );
                throw new Error(result.message || "Failed to update");
            }

            toast.success(`Provider is now ${newStatus ? "Active" : "Inactive"}`);
        } catch (err: unknown) {
            console.error("Toggle Error:", err);

            // err যদি Error অবজেক্ট হয় তবে সেটির মেসেজ দেখাবে, নাহলে ডিফল্ট মেসেজ
            const errorMessage = err instanceof Error ? err.message : "Update failed";

            toast.error(errorMessage);
        }
    };

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        toast.success("ID Copied!");
    };

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="p-4 mb-10 space-y-6 max-w-7xl mx-auto text-gray-900">
            <h1 className="text-3xl text-center p-4 font-bold tracking-tight">Providers Overview</h1>

            <div className="grid grid-cols-1 gap-6">
                {providers.map((provider) => (
                    <div key={provider.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">

                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50 p-6 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                                    <Store className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-extrabold tracking-tight capitalize">{provider.restaurantName}</h2>
                                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {provider.address}</span>
                                        <div
                                            onClick={() => handleCopy(provider.id)}
                                            className="flex items-center gap-2 cursor-pointer hover:text-blue-600 font-mono bg-white px-2 py-0.5 rounded border border-gray-200 transition-colors"
                                        >
                                            {copiedId === provider.id ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3 text-gray-400" />}
                                            ID: {provider.id.slice(0, 8)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Toggle Button - সংশোধিত অংশ */}
                            <div className="flex items-center gap-4 bg-white p-3 px-5 rounded-2xl border border-gray-200 shadow-sm self-start md:self-center">
                                <span className={`text-[10px] font-black tracking-widest ${provider.is_active ? 'text-green-600' : 'text-red-500'}`}>
                                    {provider.is_active ? 'ACTIVE' : 'INACTIVE'}
                                </span>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleToggleStatus(provider.id, provider.is_active);
                                    }}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500 z-10 ${provider.is_active ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${provider.is_active ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white">
                            <StatCard title="Total Meals" value={provider.totalMeals} icon={<Utensils className="h-4 w-4 text-orange-500" />} description="Items in menu" />
                            <StatCard title="Total Orders" value={provider.totalOrders} icon={<ShoppingBag className="h-4 w-4 text-blue-500" />} description="Lifetime orders" />
                            <StatCard title="Active Orders" value={provider.activeOrders} icon={<Clock className="h-4 w-4 text-green-500" />} description="Processing now" />
                            <StatCard title="Total Revenue" value={`৳ ${provider.totalRevenue.toLocaleString()}`} icon={<Banknote className="h-4 w-4 text-emerald-600" />} description="Net earnings" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// StatCard এবং DashboardSkeleton আগের মতোই থাকবে...
function StatCard({ title, value, icon, description }: { title: string; value: string | number; icon: React.ReactNode; description: string; }) {
    return (
        <Card className="shadow-none border-gray-100 bg-gray-50/30 hover:bg-white hover:border-blue-100 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</CardTitle>
                <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-black text-gray-800">{value}</div>
                <p className="text-[10px] text-gray-500 mt-1 font-medium italic">{description}</p>
            </CardContent>
        </Card>
    );
}

function DashboardSkeleton() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <Skeleton className="h-10 w-64 mx-auto" />
            <div className="space-y-6">
                {[1, 2].map(i => <Skeleton key={i} className="h-64 w-full rounded-3xl" />)}
            </div>
        </div>
    );
}