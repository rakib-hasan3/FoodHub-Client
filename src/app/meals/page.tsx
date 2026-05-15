import MealsClient from "@/components/MealsClient";

export const revalidate = 60;

interface MealType {
    id: string;
    name: string;
    image_url: string;
    description: string;
    price: string | number;
    featured?: boolean;
    trending?: boolean;
    preparationTime?: string;
    calories?: number | string;
    spiceLevel?: string;
    isAvailable?: boolean;
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
        let apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
        // Convert localhost to 127.0.0.1 for server-side stability in Node.js
        apiUrl = apiUrl.replace("localhost", "127.0.0.1");
        
        const res = await fetch(`${apiUrl}/api/meals`, {
            next: { revalidate: 60 },
        });


        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Fetch failed with status ${res.status}: ${errorText}`);
            throw new Error(`Failed to fetch meals: ${res.status}`);
        }

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

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MealsPage({ searchParams }: Props) {
    const meals = await getMeals();
    const params = await searchParams;
    const initialCategory = typeof params?.category === 'string' ? params.category : undefined;

    return (
        <main className="min-h-screen bg-white dark:bg-black py-12 relative overflow-hidden">
            {/* Premium Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="mx-auto max-w-7xl px-4 relative z-10">
                <header className="mb-12 text-center pt-8">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-bold tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        Fresh & Hot
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Menu</span>
                    </h1>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg font-medium">
                        Browse through our carefully curated categories and discover your next favorite meal.
                    </p>
                </header>

                <MealsClient meals={meals} initialCategory={initialCategory} />
            </div>
        </main>
    );
}