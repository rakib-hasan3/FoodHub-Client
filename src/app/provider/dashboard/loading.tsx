export default function Loading() {
    return (
        <div className="p-4 md:p-8 space-y-6">
            <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-2xl animate-pulse shadow-md" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl animate-pulse" />
                ))}
            </div>

            <div className="h-24 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl animate-pulse" />
        </div>
    );
}
