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
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/provider/allproviders`
                );
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

    if (loading)
        return <div className="py-10 text-center">Loading Providers...</div>;

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">
                        🍴 Popular Providers
                    </h2>

                    <Button
                        variant="outline"
                        onClick={() => router.push("/restaurants")}
                    >
                        View All
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {providers.slice(0, 4).map((provider) => (
                        <div
                            key={provider.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                        >
                            <div className="relative h-[180px] w-full">
                                <Image
                                    src={provider.image || "/placeholder.jpg"}
                                    alt={provider.restaurant_name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {provider.restaurant_name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {provider.address}
                                </p>

                                <Button
                                    className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
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