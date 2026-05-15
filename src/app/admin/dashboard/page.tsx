import { authClient } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Users, Store, Utensils, ShoppingBag, DollarSign } from "lucide-react";
import AdminCharts from "@/components/admin/AdminCharts";

type Stats = {
    totalUsers: number;
    totalProviders: number;
    totalMeals: number;
    totalOrders: number;
    totalRevenue: number;
    ordersByStatus: { status: string; _count: { _all: number } }[];
};

async function getAdminStats() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        
        const reqHeaders = new Headers();
        const cookieHeader = (await headers()).get("cookie");
        if (cookieHeader) reqHeaders.set("cookie", cookieHeader);
        if (token) reqHeaders.set("Authorization", `Bearer ${token}`);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/order-management/dashboard-stats`, {
            headers: reqHeaders,
            next: { revalidate: 30 },
        });
        const data = await res.json();
        return data.data as Stats;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default async function AdminDashboardPage() {
    const session = await authClient.getSession({
        fetchOptions: {
            headers: await headers(),
        },
    });

    // If server-side check fails, we don't immediately redirect to /login
    // Instead, we let the client-side AuthContext handle it to prevent loops.
    // However, if we're sure it's not an admin, we can still redirect.
    // We remove the server-side redirect to avoid production loops.
    // The client-side AuthContext will handle unauthorized access.
    const userRole = (session?.data?.user as any)?.role?.toUpperCase();
    if (session?.data && userRole && userRole !== "ADMIN") {
        redirect("/");
    }

    const stats = session?.data ? await getAdminStats() : null;

    if (!stats) return (
        <div className="p-8 text-center bg-red-50 dark:bg-red-500/10 rounded-[2rem] border border-red-100 dark:border-red-500/20">
            <p className="text-red-500 font-black">System failure: Unable to retrieve analytics.</p>
        </div>
    );

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">System Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Real-time overview of FoodHub platform performance</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                    <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Live Updates</span>
                </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <StatCard
                    title="Active Users"
                    value={stats.totalUsers}
                    icon={Users}
                    color="from-blue-500 to-cyan-400"
                    trend="+12% from last month"
                />
                <StatCard
                    title="Total Providers"
                    value={stats.totalProviders}
                    icon={Store}
                    color="from-purple-500 to-indigo-400"
                    trend="+5% new partners"
                />
                <StatCard
                    title="Menu Items"
                    value={stats.totalMeals}
                    icon={Utensils}
                    color="from-orange-500 to-yellow-400"
                    trend="Across all restaurants"
                />
                <StatCard
                    title="Gross Orders"
                    value={stats.totalOrders}
                    icon={ShoppingBag}
                    color="from-pink-500 to-rose-400"
                    trend="+28% sales growth"
                />
                <StatCard
                    title="Total Revenue"
                    value={`৳${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="from-emerald-500 to-teal-400"
                    trend="Net platform earnings"
                />
            </div>

            <AdminCharts ordersByStatus={stats.ordersByStatus} />
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, trend }: any) {
    return (
        <div className="group p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/10 dark:shadow-none hover:border-orange-500/30 dark:hover:border-orange-500/20 transition-all duration-500 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-tr ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={22} />
                </div>
            </div>

            <div>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{title}</p>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">{value}</h3>
                <div className="mt-4 flex items-center gap-2">
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500">{trend}</p>
                </div>
            </div>
        </div>
    );
}