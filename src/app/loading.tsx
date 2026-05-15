export default function Loading() {
    return (
        <div className="relative min-h-screen font-sans bg-white dark:bg-zinc-950 overflow-hidden">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10">
                {/* Hero Skeleton */}
                <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto space-y-10 text-center">
                    <div className="h-8 w-40 bg-orange-100 dark:bg-orange-900/20 rounded-full mx-auto animate-pulse" />
                    <div className="h-20 md:h-32 bg-gray-100 dark:bg-zinc-900 rounded-3xl w-3/4 mx-auto animate-pulse" />
                    <div className="h-6 bg-gray-100 dark:bg-zinc-900 rounded-full w-1/2 mx-auto animate-pulse" />
                    <div className="flex justify-center gap-4">
                        <div className="h-14 w-40 bg-gray-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
                        <div className="h-14 w-40 bg-gray-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
                    </div>
                </div>

                {/* Categories Skeleton */}
                <div className="py-10 px-4 max-w-7xl mx-auto flex gap-4 overflow-hidden">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-24 w-32 bg-gray-100 dark:bg-zinc-900 rounded-2xl flex-shrink-0 animate-pulse" />
                    ))}
                </div>

                {/* Content Grid Skeleton */}
                <div className="py-20 px-4 max-w-7xl mx-auto space-y-12">
                    <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-96 bg-gray-100 dark:bg-zinc-900 rounded-[2.5rem] animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
