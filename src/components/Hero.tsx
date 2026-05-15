"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Flame, ChevronLeft, ChevronRight, MousePointer2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: 1,
        title: "Savor the Extraordinary",
        subtitle: "Experience premium dining from the comfort of your home. Curated menus and unforgettable flavors.",
        image: "/hero-meal.png",
        accent: "from-orange-500 to-yellow-500",
        bg: "bg-orange-500/5",
        badge: "Most Popular",
        cta: "Explore Menu",
        link: "/meals"
    },
    {
        id: 2,
        title: "Lightning Fast Delivery",
        subtitle: "Your favorites, delivered hot and fresh in under 30 minutes. Real-time tracking included.",
        image: "/Margherita-Pizza.jpg",
        accent: "from-emerald-500 to-teal-400",
        bg: "bg-emerald-500/5",
        badge: "Fastest Service",
        cta: "Order Now",
        link: "/meals"
    },
    {
        id: 3,
        title: "Premium Sushi Platter",
        subtitle: "Hand-crafted by master chefs using the finest ingredients. A masterpiece in every bite.",
        image: "/Sushi-Platter.jpg",
        accent: "from-blue-500 to-indigo-400",
        bg: "bg-blue-500/5",
        badge: "Chef's Choice",
        cta: "View Details",
        link: "/meals"
    }
];

const Hero = () => {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <section className="relative min-h-[90vh] lg:h-[75vh] lg:min-h-[650px] w-full overflow-hidden bg-white dark:bg-zinc-950 flex items-center py-16 md:py-24 lg:py-0">
            
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className={`absolute top-0 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] opacity-20 transition-colors duration-1000 ${slides[currentSlide].bg}`}></div>
            </div>

            {/* Slider Navigation Buttons - Refined for mobile/tablet */}
            <div className="absolute inset-x-2 md:inset-x-6 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none lg:inset-x-12">
                <button 
                    onClick={prevSlide}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-orange-500 hover:text-white transition-all duration-300 pointer-events-auto group hidden sm:flex shadow-xl"
                >
                    <ChevronLeft size={20} className="group-active:scale-90 transition-transform md:w-8 md:h-8" />
                </button>
                <button 
                    onClick={nextSlide}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-orange-500 hover:text-white transition-all duration-300 pointer-events-auto group hidden sm:flex shadow-xl"
                >
                    <ChevronRight size={20} className="group-active:scale-90 transition-transform md:w-8 md:h-8" />
                </button>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    >
                        {/* Text Content */}
                        <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1 max-w-3xl mx-auto lg:mx-0">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-sm"
                            >
                                <Flame size={14} className="text-orange-500" />
                                <span>{slides[currentSlide].badge}</span>
                            </motion.div>

                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.85] md:leading-[0.9]"
                            >
                                {slides[currentSlide].title.split(" ").map((word, i) => (
                                    <span key={i} className={i === 2 ? `text-transparent bg-clip-text bg-gradient-to-r ${slides[currentSlide].accent}` : ""}>
                                        {word}{" "}
                                    </span>
                                ))}
                            </motion.h1>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 md:pt-6"
                            >
                                <Button
                                    onClick={() => router.push(slides[currentSlide].link)}
                                    className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 text-sm md:text-base font-black uppercase tracking-widest bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl shadow-2xl hover:scale-[1.03] active:scale-95 transition-all group"
                                >
                                    {slides[currentSlide].cta}
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button
                                    onClick={() => router.push("/restaurants")}
                                    variant="outline"
                                    className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 text-sm md:text-base font-black uppercase tracking-widest rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-white/5 transition-all"
                                >
                                    View More
                                </Button>
                            </motion.div>
                        </div>

                        {/* Image Section */}
                        <div className="relative order-1 lg:order-2 h-[280px] sm:h-[380px] md:h-[420px] lg:h-[500px] flex items-center justify-center w-full lg:max-w-none mx-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="relative w-full h-full"
                            >
                                {/* Decorative elements */}
                                <div className={`absolute inset-0 bg-gradient-to-tr ${slides[currentSlide].accent} opacity-10 rounded-[3rem] blur-[60px] md:blur-[100px] -z-10 animate-pulse`}></div>
                                
                                <div className="relative w-full h-full p-4 md:p-10">
                                    <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-4 md:border-8 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800">
                                        <Image
                                            src={slides[currentSlide].image}
                                            alt={slides[currentSlide].title}
                                            fill
                                            className="object-cover object-center"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                    </div>

                                    {/* Floating Stats */}
                                    <motion.div 
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white dark:bg-zinc-900 p-2.5 md:p-3.5 rounded-xl md:rounded-2xl shadow-xl border border-zinc-100 dark:border-white/5 hidden sm:flex items-center gap-2.5"
                                    >
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-sm md:text-base italic shadow-md shadow-orange-500/30">F</div>
                                        <div>
                                            <p className="text-[8px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">Trust Score</p>
                                            <p className="text-sm md:text-base font-black dark:text-white leading-none">★ 4.9</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 md:gap-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className="group relative py-2"
                    >
                        <div className={`h-2 md:h-2.5 rounded-full transition-all duration-500 ${
                            currentSlide === index ? "w-12 md:w-16 bg-orange-500 shadow-lg shadow-orange-500/20" : "w-3 md:w-4 bg-zinc-300 dark:bg-zinc-700"
                        }`} />
                    </button>
                ))}
            </div>

            {/* Visual Flow Indicator */}
            <div className="absolute bottom-6 right-6 md:right-12 z-20 hidden md:flex flex-col items-center gap-3 opacity-40">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 mb-12 dark:text-white">Discover</span>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-zinc-400 dark:border-white/20 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1 h-1.5 bg-orange-500 rounded-full" />
                </motion.div>
            </div>

        </section>
    );
};

export default Hero;