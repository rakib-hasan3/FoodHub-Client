"use client";

import React from "react";
import Image from "next/image";
import { 
  Calendar, 
  User, 
  Clock, 
  ChevronRight, 
  Search,
  Tag,
  ArrowRight
} from "lucide-react";

const BlogPage = () => {
  const blogs = [
    {
      title: "The Art of Perfect Pizza Dough: Secrets from Naples",
      desc: "Discover the centuries-old techniques that make authentic Neapolitan pizza the best in the world. From hydration levels to flour types.",
      date: "May 10, 2026",
      author: "Enzo Rossi",
      readTime: "8 min read",
      category: "Culinary Arts",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "10 Sustainable Food Trends to Watch in 2026",
      desc: "How technology and conscious consumerism are reshaping the food industry for a greener future. Zero-waste kitchens and lab-grown delights.",
      date: "May 08, 2026",
      author: "Sarah Jenkins",
      readTime: "6 min read",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "The Ultimate Guide to Spicy Cuisines of Southeast Asia",
      desc: "Embark on a flavorful journey through Thailand, Vietnam, and Malaysia. Understanding the balance of heat, sweet, and sour.",
      date: "May 05, 2026",
      author: "Chef Wei",
      readTime: "12 min read",
      category: "Food Travel",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Blog Header */}
        <div className="relative mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-6 flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black uppercase tracking-widest">
                Latest Insights
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
                Flavors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Stories</span>.
              </h1>
              <p className="max-w-xl text-lg text-gray-500 dark:text-gray-400 font-medium">
                Dive into our collection of culinary guides, restaurant news, and the latest food trends from around the world.
              </p>
            </div>
            
            {/* Search Blog */}
            <div className="w-full max-w-sm relative group">
              <div className="absolute inset-y-0 left-6 flex items-center text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full pl-14 pr-6 py-5 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900 outline-none text-gray-900 dark:text-white font-bold transition-all"
              />
            </div>
          </div>
        </div>

        {/* Featured Post (Visual Only) */}
        <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden mb-20 group cursor-pointer border border-gray-100 dark:border-white/5 shadow-2xl">
          <Image 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop" 
            alt="Featured Post" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-10 md:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest">
              Editor's Choice
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight max-w-3xl">
              Beyond the Menu: How FoodHub is Changing the Local Dining Scene Forever
            </h2>
            <div className="flex items-center gap-6 text-white/60 text-sm font-bold">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>By Alex Mitchell</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>May 12, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, i) => (
            <div key={i} className="group cursor-pointer space-y-6">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <div className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-emerald-500 shadow-lg">
                    {blog.category}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {blog.date}
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {blog.readTime}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-emerald-500 transition-colors tracking-tighter">
                  {blog.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 font-medium line-clamp-2 leading-relaxed">
                  {blog.desc}
                </p>
                
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white group-hover:gap-4 transition-all">
                    Read More <ArrowRight size={18} className="text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-32 p-12 md:p-20 rounded-[3.5rem] bg-emerald-500 relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Stay in the <br /> Tasty Loop.
            </h2>
            <p className="text-white/80 font-medium text-lg leading-relaxed">
              Get the latest culinary stories and exclusive restaurant offers delivered straight to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-grow px-8 py-5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder:text-white/60 font-bold focus:outline-none focus:ring-4 focus:ring-white/20"
              />
              <button className="px-10 py-5 bg-white text-emerald-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BlogPage;
