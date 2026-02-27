"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface IProvider {
    id: string;
    restaurant_name: string;
    address: string;
    image: string;
}

const ProvidersPreview = () => {
    const [providers, setProviders] = useState<IProvider[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/allproviders`);
                const result = await response.json();
                if (result.success && Array.isArray(result.data)) {
                    setProviders(result.data);
                }
            } catch (error) {
                console.error("Provider load error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProviders();
    }, []);

    if (loading) return <div className="py-10 text-center">Loading Providers...</div>;

    return (
        <section className="py-16 bg-zinc-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold">Popular Providers</h2>
                    <Button variant="outline" onClick={() => router.push("/restaurants")}>
                        View All
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {providers.slice(0, 4).map((provider, index) => (
                        <div
                            key={provider.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full overflow-hidden"
                        >
                            <div className="relative h-[180px] w-full flex-shrink-0">
                                <Image
                                    src={provider.image || "/placeholder.jpg"} // লোকাল একটা ছবি public ফোল্ডারে রাখুন
                                    alt={provider.restaurant_name}
                                    fill
                                    priority={true} // প্রথম দিকের ইমেজে এটা যোগ করুন
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-semibold text-lg line-clamp-1">
                                    {provider.restaurant_name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                    {provider.address}
                                </p>

                                <Button
                                    className="mt-auto w-full bg-primary text-white"
                                    onClick={() => router.push(`/restaurants`)}
                                >
                                    View Menu
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProvidersPreview;