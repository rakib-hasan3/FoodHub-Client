import { Star } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-black overflow-hidden pb-32">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="relative z-10">
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20">
                            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                            <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest italic animate-pulse">Synchronizing Kitchens...</span>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="h-16 md:h-20 bg-gray-200 dark:bg-zinc-800 rounded-3xl w-3/4 mx-auto animate-pulse" />
                            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-full w-1/2 mx-auto animate-pulse" />
                        </div>

                        <div className="max-w-2xl mx-auto h-20 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-[2rem] shadow-2xl animate-pulse" />
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-80 bg-white dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-xl animate-pulse" />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
