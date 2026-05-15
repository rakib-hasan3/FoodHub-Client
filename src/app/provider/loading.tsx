export default function ProviderLoading() {
    return (
        <div className="p-4 md:p-8 space-y-10 animate-pulse max-w-7xl mx-auto pb-20">
            {/* Header Skeleton */}
            <div className="space-y-3">
                <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
                <div className="h-4 w-96 bg-gray-100 dark:bg-zinc-800/50 rounded-xl" />
            </div>

            {/* Stats/Quick Actions Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-gray-100 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-white/5 p-6 space-y-4">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
                        <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                    </div>
                ))}
            </div>

            {/* Content Area Skeleton (Orders or Meals) */}
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-8 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <div className="h-6 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
                                <div className="h-4 w-32 bg-gray-100 dark:bg-zinc-800/50 rounded-full" />
                            </div>
                            <div className="h-10 w-24 bg-orange-100 dark:bg-orange-500/10 rounded-xl" />
                        </div>
                        <div className="flex gap-4 items-center pt-4 border-t border-gray-50 dark:border-white/5">
                            <div className="h-4 w-24 bg-gray-100 dark:bg-zinc-800/50 rounded-full" />
                            <div className="h-4 w-24 bg-gray-100 dark:bg-zinc-800/50 rounded-full" />
                            <div className="h-8 w-32 bg-gray-200 dark:bg-zinc-800 rounded-xl ml-auto" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
