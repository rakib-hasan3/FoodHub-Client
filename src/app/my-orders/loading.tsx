import { Package } from "lucide-react";

export default function Loading() {
    return (
        <main className="min-h-screen py-12 bg-gray-50 dark:bg-black transition-colors duration-300 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <header className="mb-12 text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 mx-auto">
                        <Package className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest animate-pulse">Order History</span>
                    </div>
                    <div className="h-10 md:h-14 bg-gray-200 dark:bg-zinc-800 rounded-2xl w-1/2 mx-auto animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-full w-1/3 mx-auto animate-pulse" />
                </header>

                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-white/5 animate-pulse shadow-sm" />
                    ))}
                </div>
            </div>
        </main>
    );
}
