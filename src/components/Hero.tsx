"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-yellow-200 via-yellow-100 to-white py-20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">

                {/* Text */}
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        🍱 Discover & Order Delicious Meals
                    </h1>
                    <p className="text-lg text-gray-700">
                        Browse menus from your favorite providers and get fresh meals delivered fast. Easy, quick & tasty!
                    </p>
                    <div>
                        <Button className="bg-primary text-white px-6 py-2 rounded-lg">
                            Order Now
                        </Button>
                    </div>
                </div>

                {/* Image */}
                <div className="flex-1 hidden md:block">
                    <Image
                        src="/hero-meal.png"
                        alt="Delicious Meals"
                        width={500}
                        height={400}
                        className="rounded-xl shadow-lg"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;
