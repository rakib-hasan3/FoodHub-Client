import { authClient } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import { Utensils, CheckCircle2, XCircle, DollarSign, TrendingUp, Sparkles, Activity, Clock } from "lucide-react";
import ProviderCharts from "@/components/dashboard/ProviderCharts";

type Meal = {
  id: string;
  status: string;
  price: string;
  category: { name: string };
};

async function getStats(providerId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const reqHeaders = new Headers();
    const cookieHeader = (await headers()).get("cookie");
    if (cookieHeader) reqHeaders.set("cookie", cookieHeader);
    if (token) reqHeaders.set("Authorization", `Bearer ${token}`);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/meals/my-meals/${providerId}`,
      { 
        headers: reqHeaders,
        next: { revalidate: 30 } 
      }
    );
    const data = await res.json();
    if (data.success) {
      return data.data as Meal[];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch stats", error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  // We remove the server-side redirect to avoid production loops.
  // The client-side AuthContext will handle unauthorized access.
  const userRole = (session?.data?.user as any)?.role?.toUpperCase();
  if (session?.data && userRole && userRole !== "PROVIDER") {
    redirect("/");
  }

  const providerId = session?.data?.user?.id;
  const userName = session?.data?.user?.name;
  const meals = providerId ? await getStats(providerId) : [];

  const totalMeals = meals.length;
  const availableMeals = meals.filter(
    (meal) => meal.status === "AVAILABLE"
  ).length;
  const unavailableMeals = meals.filter(
    (meal) => meal.status !== "AVAILABLE"
  ).length;

  const totalValue = meals.reduce(
    (sum, meal) => sum + Number(meal.price),
    0
  );

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-7xl mx-auto">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
             Culinary Intelligence
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
            Welcome back, <span className="text-orange-500 font-bold">{userName}</span>. Here is your kitchen's performance.
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-orange-500/10 border border-orange-500/20 rounded-[1.5rem] shadow-xl shadow-orange-500/5">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping" />
            <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Store Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Assets" 
            value={totalMeals} 
            icon={Utensils} 
            color="from-orange-500 to-yellow-400"
            trend="Live menu items"
        />
        <StatCard 
            title="Active Service" 
            value={availableMeals} 
            icon={CheckCircle2} 
            color="from-emerald-500 to-teal-400"
            trend="Ready for orders"
        />
        <StatCard 
            title="Out of Stock" 
            value={unavailableMeals} 
            icon={XCircle} 
            color="from-rose-500 to-pink-400"
            trend="Requires attention"
        />
        <StatCard 
            title="Menu Value" 
            value={`৳${totalValue.toLocaleString()}`} 
            icon={DollarSign} 
            color="from-blue-500 to-cyan-400"
            trend="Estimated gross value"
        />
      </div>

      {/* Analytics & Insights */}
      <ProviderCharts meals={meals} />

      {/* Intelligence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-gradient-to-br from-zinc-900 to-black dark:from-zinc-900 dark:to-zinc-950 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-orange-500/20 transition-all duration-700" />
            <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-orange-500" />
                </div>
                <div>
                    <h3 className="text-3xl font-black text-white tracking-tight">Growth Strategy</h3>
                    <p className="text-zinc-400 mt-2 max-w-xl font-medium">
                        Your current menu has <span className="text-white font-bold">{availableMeals} active items</span>. To boost visibility, consider adding more trending items to your "Featured" selection.
                    </p>
                </div>
                <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-orange-500/20">
                    Optimize Menu
                </button>
            </div>
        </div>

        <div className="p-8 bg-orange-500 rounded-[2.5rem] shadow-2xl shadow-orange-500/30 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
            
            <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                    <Activity className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black tracking-tight leading-tight">Operational<br/>Status: Elite</h3>
                <p className="mt-4 text-orange-100 font-medium leading-relaxed">Your store maintains an excellent response rate. Keep up the high standards.</p>
            </div>

            <div className="relative z-10 mt-10 p-5 bg-black/10 backdrop-blur-md rounded-3xl border border-white/10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-lg">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest opacity-80">Store Health</p>
                        <p className="text-xl font-black">Stable</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, trend }: any) {
    return (
        <div className="group p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/10 dark:shadow-none hover:border-orange-500/30 dark:hover:border-orange-500/20 transition-all duration-500 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 bg-gradient-to-tr ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform duration-500`}>
                    <Icon size={26} />
                </div>
                <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-xl">
                    <Clock size={16} className="text-gray-300" />
                </div>
            </div>
            
            <div>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{title}</p>
                <h3 className="text-4xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">{value}</h3>
                <div className="mt-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{trend}</p>
                </div>
            </div>
        </div>
    );
}