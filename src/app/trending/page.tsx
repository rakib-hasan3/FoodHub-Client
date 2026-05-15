import TrendingList from "@/components/trending/TrendingList";
import { MealType } from "@/components/MealCard";

async function getTrendingMeals() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`, { next: { revalidate: 60 } });
        const data = await res.json();
        if (data.success) {
            return data.data.filter((m: MealType) => m.trending);
        }
        return [];
    } catch (err) {
        console.error("Failed to fetch trending meals", err);
        return [];
    }
}

export default async function TrendingPage() {
    const trendingMeals = await getTrendingMeals();

    return (
        <main className="min-h-screen bg-white dark:bg-black py-16 px-4 relative overflow-hidden">
            {/* Premium Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[150px]" />
            </div>

            <TrendingList initialMeals={trendingMeals} />
        </main>
    );
}
