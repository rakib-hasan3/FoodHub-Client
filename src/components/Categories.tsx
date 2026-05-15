"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const categoriesData = [
    { id: 1, name: "Pizza", img: "/pizza.png", items: "120+ Items", color: "from-orange-500/20 to-orange-500/5" },
    { id: 2, name: "Burger", img: "/burger.jpg", items: "85+ Items", color: "from-amber-500/20 to-amber-500/5" },
    { id: 3, name: "Sushi", img: "/sussi.jpg", items: "60+ Items", color: "from-emerald-500/20 to-emerald-500/5" },
    { id: 4, name: "Desserts", img: "/dessert.jpg", items: "95+ Items", color: "from-pink-500/20 to-pink-500/5" },
];

const Categories = () => {
    const router = useRouter();

    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-8 h-[2px] bg-orange-500 rounded-full"></span>
                            <span className="text-sm font-bold uppercase tracking-wider text-orange-500">Categories</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                            What are you <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">craving</span> today?
                        </h2>
                    </div>
                    <button 
                        onClick={() => router.push('/categories')}
                        className="group flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 font-semibold transition-colors"
                    >
                        View all categories
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {categoriesData.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => router.push(`/categories/${cat.name.toLowerCase()}`)}
                            className="group cursor-pointer relative rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] dark:shadow-none dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden"
                        >
                            {/* Inner Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            
                            <div className="relative p-6 flex flex-col items-center text-center">
                                {/* Image Container */}
                                <div className="w-32 h-32 mb-6 relative rounded-full overflow-hidden shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border-4 border-white dark:border-zinc-800">
                                    <Image
                                        src={cat.img}
                                        alt={cat.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                                    {cat.name}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                                    {cat.items}
                                </p>

                                {/* Hover Arrow Indicator */}
                                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <ArrowRight className="w-5 h-5 text-zinc-900 dark:text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
