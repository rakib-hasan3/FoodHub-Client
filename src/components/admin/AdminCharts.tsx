"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from "recharts";
import { TrendingUp, Package, Clock } from "lucide-react";

export default function AdminCharts({ ordersByStatus }: { ordersByStatus: any[] }) {
    const chartData = (ordersByStatus || []).map((item) => ({
        status: item.status,
        count: item._count._all,
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bar Chart: Order Status */}
            <div className="lg:col-span-2 p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Orders Lifecycle</h3>
                        <p className="text-sm text-gray-500 font-medium">Distribution by current fulfillment status</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div className="h-[350px] w-full">
                    {chartData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 italic">
                            <Package className="w-12 h-12 mb-3 opacity-20" />
                            <p>No transaction data available yet</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.1} />
                                <XAxis
                                    dataKey="status"
                                    tick={{ fontSize: 10, fontWeight: 800, fill: '#888888' }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    allowDecimals={false}
                                    tick={{ fontSize: 10, fontWeight: 800, fill: '#888888' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(249, 115, 22, 0.05)' }}
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '20px',
                                        border: 'none',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        padding: '15px'
                                    }}
                                    itemStyle={{ fontWeight: 900, fontSize: '14px', color: '#f97316' }}
                                />
                                <Bar dataKey="count" radius={[12, 12, 0, 0]} barSize={40}>
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                entry.status === "DELIVERED" ? "#10b981" : 
                                                entry.status === "PLACED" ? "#f97316" : 
                                                entry.status === "PREPARING" ? "#3b82f6" : 
                                                entry.status === "READY" ? "#8b5cf6" : "#f43f5e"
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Right Side Info: System Health */}
            <div className="p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] shadow-2xl shadow-orange-500/30 text-white flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
                
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                        <Clock className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight leading-tight">System Status<br/>is Optimal</h3>
                    <p className="mt-4 text-orange-100 font-medium leading-relaxed">All background processes and payment gateways are running smoothly without any reported latency.</p>
                </div>

                <div className="relative z-10 mt-10 p-5 bg-black/10 backdrop-blur-md rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-lg">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest opacity-80">Platform Health</p>
                            <p className="text-xl font-black">99.9% Uptime</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
