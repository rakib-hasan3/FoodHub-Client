"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Pizza, 
  Beef, 
  Fish, 
  IceCream, 
  UtensilsCrossed, 
  Flame,
  Search,
  ChevronRight
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

const CategoriesPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        const result = await res.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getCategoryStyles = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('pizza')) return { color: "from-orange-500 to-amber-500", icon: <Pizza size={32} />, img: "/pizza.png" };
    if (n.includes('burger') || n.includes('beef')) return { color: "from-red-500 to-orange-500", icon: <Beef size={32} />, img: "/burger.jpg" };
    if (n.includes('sushi') || n.includes('fish')) return { color: "from-emerald-500 to-teal-500", icon: <Fish size={32} />, img: "/sussi.jpg" };
    if (n.includes('dessert') || n.includes('cake')) return { color: "from-pink-500 to-rose-500", icon: <IceCream size={32} />, img: "/dessert.jpg" };
    return { color: "from-orange-500 to-yellow-500", icon: <UtensilsCrossed size={32} />, img: null };
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Hero Section */}
        <div className="relative mb-20">
          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-black uppercase tracking-widest animate-fade-in">
              <Flame size={16} />
              Explore All Cuisines
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
              What are you <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">craving</span> today?
            </h1>
            <p className="max-w-xl text-gray-500 dark:text-gray-400 text-lg font-medium">
              Discover the best food from top-rated restaurants across various categories. Your next favorite meal is just a click away.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-lg relative group">
              <div className="absolute inset-0 bg-orange-500/20 blur-2xl group-hover:bg-orange-500/30 transition-all duration-500 rounded-full" />
              <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-3xl p-2 shadow-2xl overflow-hidden">
                <div className="pl-4 text-gray-400">
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="h-64 rounded-[2rem] bg-gray-100 dark:bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredCategories.map((cat) => {
              const styles = getCategoryStyles(cat.name);
              return (
                <div
                  key={cat.id}
                  onClick={() => router.push(`/categories/${cat.name.toLowerCase()}`)}
                  className="group cursor-pointer relative rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] dark:shadow-none dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden"
                >
                  {/* Inner Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.color} opacity-0 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative p-8 flex flex-col items-center text-center">
                    {/* Image Container */}
                    <div className="w-32 h-32 mb-6 relative rounded-full overflow-hidden shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border-4 border-white dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800 flex items-center justify-center">
                      {styles.img ? (
                        <Image
                          src={styles.img}
                          alt={cat.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      ) : (
                        <div className={`text-orange-500`}>
                          {styles.icon}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 rounded-full">
                      Explore Collection
                    </p>

                    {/* Hover Arrow Indicator */}
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-zinc-900 dark:text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredCategories.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 mb-6">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">No categories found</h3>
            <p className="text-gray-500 mt-2">Try searching with a different term.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoriesPage;
