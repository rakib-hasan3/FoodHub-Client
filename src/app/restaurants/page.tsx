"use client";

import { Store, MapPin, Star, Utensils, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProviderType {
    user_id: string;
    restaurant_name: string;
    address: string;
    image?: string;
    rating?: number;
}

export default function ProvidersPage() {
    const [providers, setProviders] = useState<ProviderType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/provider/allproviders`,
                    { cache: "no-store" }
                );
                const result = await res.json();
                if (result.success && Array.isArray(result.data)) {
                    setProviders(result.data);
                } else {
                    setProviders([]);
                }
            } catch (error) {
                console.error("Error fetching providers:", error);
                setProviders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProviders();
    }, []);

    if (loading)
        return <div className="text-center py-20 text-gray-500">Loading Providers...</div>;

    return (
        <main className="min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
                        Our Food <span className="text-orange-500">Providers</span> 🏢
                    </h1>
                </header>

                {providers.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-sm">
                        <p className="text-gray-400 font-bold">কোনো রেস্টুরেন্ট পাওয়া যায়নি!</p>
                    </div>
                ) : (
                    <div className="grid gap-8 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {providers.map((provider) => (
                            <div key={provider.user_id} className="w-full flex justify-center">
                                <div className="w-full max-w-[380px] flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                                    {/* Image */}
                                    <div className="relative h-56 w-full bg-gray-200">
                                        <img
                                            src={
                                                provider.image ||
                                                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                                            }
                                            alt={provider.restaurant_name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Rating Badge */}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md py-1.5 px-3 rounded-2xl flex items-center gap-1.5 shadow-md">
                                            <Star size={14} className="text-orange-500 fill-orange-500" />
                                            <span className="text-sm font-bold text-gray-800">
                                                {provider.rating || "4.5"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h2 className="text-2xl font-bold text-gray-900 line-clamp-1">
                                            {provider.restaurant_name}
                                        </h2>
                                        <p className="text-gray-500 text-sm mt-2 mb-4 flex items-center gap-1.5">
                                            <MapPin size={16} className="text-orange-500" /> {provider.address}
                                        </p>

                                        <Link
                                            href={`/restaurants/${provider.user_id}`}
                                            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold rounded-2xl shadow-md transition-all"
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