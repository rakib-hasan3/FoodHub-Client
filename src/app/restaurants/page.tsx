import { Store, MapPin, Star, Utensils, ArrowRight } from "lucide-react";
import Link from "next/link";
export const dynamic = "force-dynamic";

// ১. টাইপ ডিফাইন করা
interface ProviderType {
    user_id: string;
    restaurant_name: string;
    address: string;
    image?: string;
    rating?: number;
}

// ২. ডাটা ফেচ করার ফাংশন
async function getProviders(): Promise<ProviderType[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/allproviders`, {
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch providers");

        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
            return result.data;
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
        <main className="min-h-screen bg-gray-50/50 py-16">
            <div className="max-w-7xl mx-auto px-4">

                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-2 font-black text-gray-900 uppercase tracking-tight">
                        Our Food <span className="text-orange-500">Providers</span> 🏢
                    </h1>
                </header>

                {providers.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold">কোনো রেস্টুরেন্ট পাওয়া যায়নি!</p>
                    </div>
                ) : (
                    /* গ্রিড ফিক্স: lg তে ৩টি, md তে ২টি এবং মোবাইলে ১টি কার্ড দেখাবে */
                    <div
                        className="grid gap-8 w-full"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', // এটি বড় স্ক্রিনে ৩টা বা তার বেশি কার্ড বসাবে
                        }}
                    >
                        {providers.map((provider) => (
                            <div key={provider.user_id} className="w-full flex justify-center">
                                {/* কার্ডের মেইন কন্টেইনার */}
                                <div className="w-full max-w-[380px] rounded-lg bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col">
                                    {/* বাকি সব ইমেজ এবং কন্টেন্ট এখানে থাকবে */}
                                    <div className="relative h-56 w-full bg-gray-200">
                                        <img
                                            src={provider.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"}
                                            alt={provider.restaurant_name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="p-4">
                                        <h2 className="text-2xl  font-bold text-gray-900 line-clamp-1">
                                            {provider.restaurant_name}
                                        </h2>
                                        <div className="absolute top-4  bg-white/90 backdrop-blur-md  py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
                                            <Star size={14} className="text-orange-500 fill-orange-500" />
                                            <span className="text-sm font-black text-gray-800">
                                                {provider.rating || "4.5"}
                                            </span>
                                        </div>
                                        <p className="text-gray-500  text-sm mt-2 mb-6">{provider.address}</p>

                                        <Link
                                            href={`/restaurants/${provider.user_id}`}
                                            className="flex items-center justify-center gap-2 w-full py-4 text-black rounded-2xl font-bold hover:bg-orange-500 transition-all"
                                        >
                                            See Menu <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}