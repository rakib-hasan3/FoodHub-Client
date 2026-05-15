import { Loader2 } from "lucide-react";

export default function AdminLoading() {
    return (
        <div className="space-y-10 animate-pulse pb-20">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                    <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
                    <div className="h-4 w-96 bg-gray-100 dark:bg-zinc-800/50 rounded-xl" />
                </div>
                <div className="h-12 w-40 bg-orange-100 dark:bg-orange-500/10 rounded-2xl border border-orange-200 dark:border-orange-500/20" />
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-44 bg-gray-100 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-white/5 p-6 space-y-4">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
                        <div className="space-y-2">
                            <div className="h-2 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                            <div className="h-8 w-24 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area Skeleton (Table or Charts) */}
            <div className="space-y-6">
                <div className="h-[400px] w-full bg-gray-50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-8">
                    <div className="flex items-center justify-between mb-10">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
                        <div className="flex gap-2">
                            <div className="h-10 w-32 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
                            <div className="h-10 w-10 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-12 w-full bg-gray-100 dark:bg-zinc-800/50 rounded-xl flex items-center px-4 gap-4">
                                <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg shrink-0" />
                                <div className="h-4 w-1/4 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                                <div className="h-4 w-1/4 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                                <div className="h-4 w-1/4 bg-gray-200 dark:bg-zinc-800 rounded-full ml-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

