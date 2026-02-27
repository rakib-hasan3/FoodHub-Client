import MealCard from "@/components/MealCard";
export const dynamic = "force-dynamic";
interface MealType {
    id: string;
    name: string;
    image_url: string;
    description: string;
    price: string;
    provider: {
        restaurant_name: string;
        address: string;
    };
    category: {
        name: string;
    };
}

async function getMeals(): Promise<MealType[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`, {
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch meals");

        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
            return result.data;
        }

        return [];
    } catch (error) {
        console.error("Error fetching meals:", error);
        return [];
    }
}

export default async function MealsPage() {
    const meals = await getMeals();

    return (
        <main className="min-h-screen mt-4  bg-gray-50/50 py-12">
            {/* px-4 ভ্যালুটা এখানে ঠিক করে দিলাম */}
            <div className="mx-auto  max-w-7xl px-4">

                <header className="mb-12  text-center">
                    <h1 className="text-4xl font-bold font-black text-gray-900 tracking-tight">
                        Our <span className="text-orange-500">Meals</span> 🍱
                    </h1>
                    <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
                </header>

                {meals.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border">
                        <p className="text-gray-400 font-bold">কোনো ডাটা পাওয়া যায়নি!</p>
                    </div>
                ) : (
                    /* আমরা এখানে একদম Raw CSS ব্যবহার করছি যাতে ক্লাস কাজ না করলেও গ্রিড কাজ করে */
                    <div
                        className="grid gap-8 w-full"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        }}
                    >
                        {meals.map((meal: MealType, index) => (
                            <div key={meal.id} className="flex justify-center w-full">
                                <MealCard key={`${meal.id}-${index}`} meal={meal} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}