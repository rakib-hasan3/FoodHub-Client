"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const providersData = [
    {
        id: 1,
        name: "Pizza Palace",
        address: "Dhanmondi, Dhaka",
        image: "/provider-1.jpg",
    },
    {
        id: 2,
        name: "Burger Hub",
        address: "Banani, Dhaka",
        image: "/provider-2.jpg",
    },
    {
        id: 3,
        name: "Sushi World",
        address: "Gulshan, Dhaka",
        image: "/provider-3.jpg",
    },
    {
        id: 4,
        name: "Sweet Treats",
        address: "Mirpur, Dhaka",
        image: "/provider-4.jpg",
    },
];

const ProvidersPreview = () => {
    return (
        <section className="py-16 bg-zinc-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold">Popular Providers</h2>
                    <Button variant="outline">View All</Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {providersData.map((provider) => (
                        <div
                            key={provider.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                        >
                            <Image
                                src={provider.image}
                                alt={provider.name}
                                width={400}
                                height={250}
                                className="object-cover w-full h-[180px]"
                            />

                            <div className="p-4">
                                <h3 className="font-semibold text-lg">
                                    {provider.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {provider.address}
                                </p>

                                <Button className="mt-4 w-full">
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
