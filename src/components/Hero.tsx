"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

const Hero = () => {
    const router = useRouter();

    return (
        <section className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-white py-28 overflow-hidden">

            {/* Floating background shapes */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 -right-32 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">

                {/* Text */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 relative">
                        🍱 Discover & Order <span className="text-orange-500">Delicious Meals</span>
                    </h1>

                    <p className="text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
                        Browse menus from your favorite providers and get fresh meals delivered fast. Easy, quick & tasty!
                    </p>

                    {/* Highlight badges */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-4 justify-center md:justify-start">
                        <span className="flex items-center gap-1 bg-orange-100 text-orange-600 font-semibold text-sm px-3 py-1 rounded-full shadow">
                            <Star size={14} /> Popular
                        </span>
                        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-600 font-semibold text-sm px-3 py-1 rounded-full shadow">
                            Fast Delivery 🚀
                        </span>
                    </div>

                    <div className="mt-4 flex justify-center md:justify-start">
                        <Button
                            onClick={() => router.push("/meals")}
                            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            Order Now 🚀
                        </Button>
                    </div>
                </div>

                {/* Image */}
                <div className="flex-1 hidden md:block relative">
                    <Image
                        src="/hero-meal.png"
                        alt="Delicious Meals"
                        width={500}
                        height={400}
                        className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 mx-auto"
                    />
                </div>

            </div>

            {/* Blob animation keyframes */}
            <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -10px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

        </section>
    );
};

export default Hero;