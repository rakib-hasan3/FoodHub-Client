import RestaurantList from "@/components/restaurants/RestaurantList";

async function getProviders() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/provider/allproviders`,
            { next: { revalidate: 60 } }
        );
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
            return result.data.map((p: any) => ({
                ...p,
                id: p.user_id || p.id
            }));
        }
        return [];
    } catch (error) {
        console.error("Error fetching providers:", error);
        return [];
    }
}

export default async function ProvidersPage() {
    const providers = await getProviders();

    return (
        <main className="min-h-screen bg-[#FAFAFA] dark:bg-black overflow-hidden pb-32">
            {/* Premium Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[150px]" />
            </div>

            <RestaurantList initialProviders={providers} />
        </main>
    );
}