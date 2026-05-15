import { Package } from "lucide-react";

export default function Loading() {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
            <div className="space-y-4">
                <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl w-48 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-full w-64 animate-pulse" />
            </div>

            <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 w-24 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 animate-pulse" />
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-96 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-white/5 animate-pulse shadow-sm" />
                ))}
            </div>
        </div>
    );
}
