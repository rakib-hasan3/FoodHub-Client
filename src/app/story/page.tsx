"use client";

import React from "react";
import { Compass, Rocket, Users, Heart, Globe, Star, ArrowRight } from "lucide-react";

const StoryPage = () => {
  const milestones = [
    {
      year: "2023",
      title: "The Genesis",
      desc: "Founded in a small kitchen with a big dream to connect local chefs with food lovers."
    },
    {
      year: "2024",
      title: "Global Reach",
      desc: "Expanded to 50 cities, partnering with over 1,000 premium restaurants."
    },
    {
      year: "2025",
      title: "Tech Innovation",
      desc: "Launched our AI-driven delivery system, cutting wait times by 40%."
    },
    {
      year: "2026",
      title: "Sustainability",
      desc: "Committed to 100% zero-waste packaging across our entire network."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Story Hero */}
        <div className="relative text-center space-y-10 mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-widest">
            The FoodHub Journey
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
            From one kitchen to <br /> the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">entire world</span>.
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Our story isn't just about delivery; it's about the connection between creators and connoisseurs. We've spent years perfecting the art of food logistics to bring you the flavors you love.
          </p>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] -z-10" />
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Our Core Values</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">
                Every decision we make is guided by three principles: Unmatched Quality, Absolute Transparency, and Boundless Innovation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-white/5 space-y-4">
                <Heart className="text-rose-500" />
                <h4 className="font-black text-gray-900 dark:text-white">Built with Love</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">We care about every meal as if it were our own.</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-white/5 space-y-4">
                <Rocket className="text-blue-500" />
                <h4 className="font-black text-gray-900 dark:text-white">Driven by Tech</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Pushing the boundaries of food logistics.</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full aspect-square rounded-[4rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl relative z-10 group">
              <img 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Culinary Team" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-3xl font-black">Our Team</p>
                <p className="font-medium text-white/60 uppercase tracking-widest text-xs">The faces behind the flavors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-20 mb-32">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Milestones of Excellence</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Our journey of growth and transformation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Timeline Line */}
            <div className="absolute top-10 left-0 w-full h-px bg-gray-100 dark:bg-white/10 hidden lg:block" />
            
            {milestones.map((m, i) => (
              <div key={i} className="relative z-10 space-y-6 group">
                <div className="w-20 h-20 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-3xl flex items-center justify-center text-orange-500 shadow-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  <span className="text-xl font-black tracking-tighter">{m.year}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{m.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-16 md:p-24 rounded-[4rem] bg-orange-500 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Be part of the next chapter.</h2>
            <p className="text-white/80 font-medium text-lg leading-relaxed">Join thousands of restaurants and food lovers who are redefining the dining experience every day.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button className="px-10 py-5 bg-white text-orange-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                Start Ordering Now
              </button>
              <button className="px-10 py-5 bg-orange-600 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-2">
                Partner with us <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoryPage;
