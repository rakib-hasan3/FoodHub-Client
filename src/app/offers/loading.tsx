export default function Loading() {
    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-black pb-24">
            <div className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-500/10 via-transparent to-transparent -z-10" />
                
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <div className="h-8 w-32 bg-orange-200 dark:bg-orange-900/30 rounded-full mx-auto animate-pulse" />
                    <div className="h-16 md:h-24 bg-gray-200 dark:bg-zinc-800 rounded-3xl w-3/4 mx-auto animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-full w-1/2 mx-auto animate-pulse" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mb-12">
                <div className="h-20 bg-white/50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-gray-100 dark:border-white/5 animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-[450px] bg-gray-100 dark:bg-white/5 rounded-[2.5rem] animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}
