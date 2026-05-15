"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MealCard, { MealType } from "@/components/MealCard";
import { 
  ArrowLeft, 
  Pizza, 
  Beef, 
  Fish, 
  IceCream, 
  UtensilsCrossed, 
  Flame,
  Star
} from "lucide-react";

const CategoryDetailPage = () => {
  const { name } = useParams();
  const router = useRouter();
  const [meals, setMeals] = useState<MealType[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryName = typeof name === 'string' ? decodeURIComponent(name) : "";

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`);
        const result = await res.json();
        if (result.success) {
          // Filter meals by category name on frontend for now
          const filtered = result.data.filter((m: any) => 
            m.category?.name.toLowerCase() === categoryName.toLowerCase()
          );
          setMeals(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [categoryName]);

  const getCategoryTheme = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('pizza')) return { 
      title: "Pizza Masterpieces", 
      subtitle: "Hand-crafted, oven-fresh pizzas with premium toppings.",
      color: "from-orange-600 to-amber-500", 
      icon: <Pizza size={40} />,
      accent: "bg-orange-500"
    };
    if (n.includes('burger') || n.includes('beef')) return { 
      title: "Juicy Burgers & Meats", 
      subtitle: "The ultimate comfort food made with prime cuts.",
      color: "from-red-600 to-orange-500", 
      icon: <Beef size={40} />,
      accent: "bg-red-500"
    };
    if (n.includes('sushi') || n.includes('fish')) return { 
      title: "Ocean's Finest", 
      subtitle: "Fresh, healthy, and exquisitely prepared seafood.",
      color: "from-emerald-600 to-teal-500", 
      icon: <Fish size={40} />,
      accent: "bg-emerald-500"
    };
    if (n.includes('dessert') || n.includes('cake')) return { 
      title: "Sweet Indulgences", 
      subtitle: "Heavenly desserts to satisfy your sweetest cravings.",
      color: "from-pink-600 to-rose-500", 
      icon: <IceCream size={40} />,
      accent: "bg-pink-500"
    };
    return { 
      title: `${name} Collection`, 
      subtitle: `Explore our unique selection of ${name} dishes.`,
      color: "from-zinc-800 to-zinc-900", 
      icon: <UtensilsCrossed size={40} />,
      accent: "bg-orange-500"
    };
  };

  const theme = getCategoryTheme(categoryName);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors mb-12 font-bold group"
        >
          <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 shadow-lg flex items-center justify-center group-hover:-translate-x-1 transition-transform">
            <ArrowLeft size={20} />
          </div>
          Back to Categories
        </button>

        {/* Dynamic Category Hero */}
        <div className="relative mb-20 p-10 md:p-16 rounded-[3rem] overflow-hidden">
          {/* Background Gradient & Pattern */}
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-90`} />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest">
                <Star size={14} fill="white" />
                Featured Category
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                {theme.title}
              </h1>
              <p className="text-lg text-white/80 font-medium max-w-xl">
                {theme.subtitle}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-6 text-white pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-black">{meals.length}</span>
                  <span className="text-xs uppercase font-bold opacity-60">Meals Available</span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex flex-col">
                  <span className="text-3xl font-black">4.9</span>
                  <span className="text-xs uppercase font-bold opacity-60">Avg Rating</span>
                </div>
              </div>
            </div>
            
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-white/10 backdrop-blur-xl border-4 border-white/20 flex items-center justify-center text-white shadow-2xl animate-float">
              {theme.icon}
            </div>
          </div>
        </div>

        {/* Meals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {meals.map((meal) => (
              <div key={meal.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                <MealCard meal={meal} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-300 mb-6">
              <UtensilsCrossed size={48} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">No meals found in this category</h3>
            <p className="text-gray-500 mt-2">Check back later or explore other delicious options.</p>
            <button 
              onClick={() => router.push('/meals')}
              className="mt-8 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              Explore All Meals
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryDetailPage;
