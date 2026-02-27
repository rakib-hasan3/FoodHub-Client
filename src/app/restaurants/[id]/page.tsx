import MealCard from "@/components/MealCard";
import { MapPin, Store, UtensilsCrossed } from "lucide-react";

interface MealType {
    id: string;
    name: string;
    image_url: string;
    description: string;
    price: string;
    provider?: { // Optional, কারণ API response এ নেই
        restaurant_name: string;
        address: string;
    };
    category: {
        name: string;
    };
}

// ডাটা ফেচ করার ফাংশন
async function getProviderMeals(id: string): Promise<MealType[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals/my-meals/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch provider meals");

        const result = await res.json();
        return result.success ? result.data : [];
    } catch (error) {
        console.error("Error fetching provider meals:", error);
        return [];
    }
}

export default async function ProviderMenuPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const meals = await getProviderMeals(id);

    const restaurantName = meals[0]?.provider?.restaurant_name ?? "Restaurant Menu";
    const restaurantAddress = meals[0]?.provider?.address ?? "";

    return (
        <main className="min-h-screen  bg-gray-50/50 py-12">
            <div className="max-w-7xl mt-4 mx-auto px-4">

                {/* Header Section: রেস্টুরেন্ট ইনফো */}
                <header className="mb-12 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden text-center">
                    <div className="relative z-10">
                        <div className="bg-orange-100 w-16 mt-4 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Store className="text-orange-600" size={32} />
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">{restaurantName}</h1>
                        <div className="flex items-center justify-center gap-2 text-gray-500 font-medium">
                            <MapPin size={18} className="text-black" />
                            <span>{restaurantAddress}</span>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                </header>

                <div className="flex items-center gap-3 mb-8">
                    <UtensilsCrossed className="text-orange-500" />
                    <h2 className="text-2xl p-4  font-bold text-gray-800">Available Meals</h2>
                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                </div>

                {/* Meals Grid */}
                {meals.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold text-lg">
                            এই রেস্টুরেন্টের কোনো খাবার পাওয়া যায়নি!
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', // এটি বড় স্ক্রিনে ৩টা বা তার বেশি কার্ড বসাবে
                    }} className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-stretch">
                        {meals.map((meal) => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}