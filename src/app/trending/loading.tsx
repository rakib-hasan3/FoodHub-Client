import { TrendingUp } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-white dark:bg-black py-16 px-4 relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
            </div>
            <div className="max-w-7xl mx-auto space-y-16">
                <header className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 mx-auto">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest animate-pulse">Live Trending</span>
                    </div>
                    <div className="h-12 md:h-20 bg-gray-200 dark:bg-zinc-800 rounded-3xl w-2/3 mx-auto animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-full w-1/2 mx-auto animate-pulse" />
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-[3/4] bg-gray-100 dark:bg-zinc-900 rounded-[2.5rem] animate-pulse shadow-sm" />
                    ))}
                </div>
            </div>
        </div>
    );
}
