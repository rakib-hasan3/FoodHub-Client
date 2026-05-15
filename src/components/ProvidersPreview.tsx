import React from "react";
import ProviderCard from "./ProviderCard";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

async function getProviders() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/provider/allproviders`,
            { next: { revalidate: 60 } }
        );
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
            // Map IDs and Sort by rating (highest first)
            return result.data
                .map((p: any) => ({ ...p, id: p.user_id || p.id }))
                .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
        }
        return [];
    } catch (error) {
        console.error("Provider load error:", error);
        return [];
    }
}

const ProvidersPreview = async () => {
    const providers = await getProviders();

    if (providers.length === 0) return null;

    return (
        <section className="py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20">
                            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                            <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Top Rated Kitchens</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                            Popular <span className="text-orange-500 underline decoration-8 decoration-orange-500/20 underline-offset-8">Providers</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl text-lg">
                            The most loved kitchens in your neighborhood. Selected based on customer reviews and food quality.
                        </p>
                    </div>

                    <Link
                        href="/restaurants"
                        className="group flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-orange-500/20 w-full sm:w-auto justify-center"
                    >
                        View All Partners
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {providers.slice(0, 4).map((provider: any) => (
                        <ProviderCard key={provider.id} provider={provider} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProvidersPreview;