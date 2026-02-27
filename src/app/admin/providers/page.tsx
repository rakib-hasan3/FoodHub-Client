"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, ShoppingBag, Clock, Banknote, MapPin, Store, Copy, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
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
            const response = await fetch("http://localhost:5000/api/provider/dashboard-stats", {
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
        try {
            const newStatus = !currentStatus;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/update-status/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_active: newStatus }),
            });

            const result = await response.json();

            if (result.success) {
                setProviders((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, is_active: newStatus } : p))
                );
                toast.success(`Provider is now ${newStatus ? 'Active' : 'Inactive'}`);
            } else {
                toast.error("Failed to update status");
            }
        } catch (err) {
            console.error("Update Error:", err);
            toast.error("Network error! Try again.");
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
        <div className="p-4 sm:p-4 mb- space-y-4 max-w-7xl mx-auto text-gray-900">
            <h1 className="text-3xl text-center p-4 font-bold tracking-tight">Providers Overview</h1>

            <div className="grid grid-cols-1 gap-4">
                {providers.map((provider) => (
                    <div key={provider.id} className="space-y-2">

                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10 transition-all duration-300">
                            <div className="flex items-center gap-2">
                                <div className="p-4 bg-primary rounded-xl shadow-md">
                                    <Store className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight capitalize">{provider.restaurantName}</h2>
                                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                                        <span className="flex items-center  gap-"><MapPin className="h-4  w-4" /> {provider.address}</span>
                                        <div
                                            onClick={() => handleCopy(provider.id)}
                                            className="flex items-center gap-2  cursor-pointer hover:text-primary font-mono bg-white px-2 py-0.5 rounded border"
                                        >
                                            {copiedId === provider.id ? <Check className="h-3.5  w-3.5  text-green-500" /> : <Copy className="h-3.5 w-3.5 text-gray-400" />}
                                            ID: {provider.id.slice(0, 8)}...
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white p-4 px-5 rounded-2xl border shadow-sm">
                                <span className={`text-xs font-black tracking-widest ${provider.is_active ? 'text-green-600' : 'text-red-500'}`}>
                                    {provider.is_active ? 'ACTIVE' : 'INACTIVE'}
                                </span>

                                <button
                                    onClick={() => handleToggleStatus(provider.id, provider.is_active)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${provider.is_active ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${provider.is_active ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4">
                            <StatCard title="Total Meals" value={provider.totalMeals} icon={<Utensils className="h-4 w-4 text-orange-500" />} description="Items in menu" />
                            <StatCard title="Total Orders" value={provider.totalOrders} icon={<ShoppingBag className="h-4 w-4 text-blue-500" />} description="Lifetime orders" />
                            <StatCard title="Active Orders" value={provider.activeOrders} icon={<Clock className="h-4 w-4 text-green-500" />} description="Processing now" />
                            <StatCard title="Total Revenue" value={`৳ ${provider.totalRevenue.toLocaleString()}`} icon={<Banknote className="h-4  w-4 text-emerald-600" />} description="Net earnings" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


function StatCard({ title, value, icon, description }: { title: string; value: string | number; icon: React.ReactNode; description: string; }) {
    return (
        <Card className="shadow-none p-4 border-gray-100 bg-white hover:border-primary/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-black">{value}</div>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">{description}</p>
            </CardContent>
        </Card>
    );
}

function DashboardSkeleton() { return <div className="p-8 space-y-8"><Skeleton className="h-10 w-64" /><Skeleton className="h-32 w-full rounded-2xl" /></div>; }