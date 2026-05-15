"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import { TrendingUp, Package, Activity } from "lucide-react";

export default function ProviderCharts({ meals }: { meals: any[] }) {
    const statusData = [
        { name: "Available", value: meals.filter(m => m.status === "AVAILABLE").length, color: "#10b981" },
        { name: "Unavailable", value: meals.filter(m => m.status !== "AVAILABLE").length, color: "#f43f5e" }
    ];

    const categoryCounts: Record<string, number> = {};
    meals.forEach(m => {
        const cat = m.category?.name || "Unknown";
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inventory Distribution */}
            <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Inventory Status</h3>
                        <p className="text-sm text-gray-500 font-medium">Real-time culinary asset distribution</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                        <Activity className="w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    {statusData.map(item => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Performance */}
            <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Menu Spread</h3>
                        <p className="text-sm text-gray-500 font-medium">Items distribution across categories</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
                            />
                            <YAxis hide />
                            <Tooltip 
                                cursor={{ fill: 'rgba(249, 115, 22, 0.05)' }}
                                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
