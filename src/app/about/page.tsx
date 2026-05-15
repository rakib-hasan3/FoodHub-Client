"use client";

import React from "react";
import Image from "next/image";
import {
  Users,
  Target,
  Heart,
  Zap,
  ShieldCheck,
  Award,
  ArrowRight
} from "lucide-react";

const AboutPage = () => {
  const stats = [
    { label: "Active Users", value: "500k+", icon: <Users className="text-blue-500" /> },
    { label: "Top Restaurants", value: "2,500+", icon: <ShieldCheck className="text-emerald-500" /> },
    { label: "Cities Covered", value: "150+", icon: <Target className="text-orange-500" /> },
    { label: "Positive Reviews", value: "1.2M+", icon: <Heart className="text-rose-500" /> },
  ];

  const features = [
    {
      title: "Quality First",
      desc: "We partner only with the highest-rated restaurants to ensure every meal is a masterpiece.",
      icon: <Award className="w-8 h-8 text-orange-500" />,
      color: "bg-orange-500/10"
    },
    {
      title: "Fastest Delivery",
      desc: "Our optimized logistics network ensures your food arrives hot and fresh, every single time.",
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-500/10"
    },
    {
      title: "Secure Payments",
      desc: "State-of-the-art encryption protecting every transaction you make on our platform.",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      color: "bg-emerald-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 mb-32 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-black uppercase tracking-widest animate-fade-in">
              Discover Our Story
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
              Revolutionizing the way you <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">experience</span> food.
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">
              FoodHub started with a simple mission: to bridge the gap between hungry foodies and the finest culinary creators in the world. We believe food is more than just fuel; it's an experience, a memory, and a passion.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <button className="px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-2 group">
                Join Our Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-yellow-500/20 rounded-[3rem] blur-2xl group-hover:scale-110 transition-transform duration-700" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl z-10">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
                  alt="Delicious Food Experience"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-2xl z-20 animate-float hidden md:block border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                    <Heart size={24} fill="white" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-900 dark:text-white leading-none">100%</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-white/[0.02] py-24 mb-32 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl flex items-center justify-center mb-2">
                  {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{stat.value}</h3>
                <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">Why People Love FoodHub</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto">We don't just deliver food; we deliver excellence, speed, and safety in every order.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl hover:border-orange-500/30 dark:hover:border-orange-500/20 transition-all duration-500">
              <div className={`w-20 h-20 ${f.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="relative p-12 md:p-20 rounded-[3.5rem] bg-zinc-900 dark:bg-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-white dark:text-black tracking-tight leading-tight">
              "To make the world's most incredible flavors accessible to everyone, everywhere."
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
            <p className="text-white/60 dark:text-black/60 font-bold uppercase tracking-widest text-sm">Our Global Mission</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;