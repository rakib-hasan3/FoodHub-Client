"use client";

import React from "react";
import { ShieldAlert, ShieldCheck, UserCheck, Smartphone, Bell, HeartPulse, Sparkles } from "lucide-react";

const SafetyPage = () => {
  const pillars = [
    {
      title: "Hygiene Standards",
      desc: "Every restaurant partner must adhere to strict hygiene protocols. We conduct regular spot checks to ensure your food is prepared in a safe environment.",
      icon: <HeartPulse className="text-rose-500" />,
      bg: "bg-rose-500/10"
    },
    {
      title: "Secure Deliveries",
      desc: "Our delivery partners are trained in contact-free delivery and carry sanitized bags to maintain food integrity from kitchen to doorstep.",
      icon: <ShieldCheck className="text-emerald-500" />,
      bg: "bg-emerald-500/10"
    },
    {
      title: "Platform Security",
      desc: "Your data is encrypted with enterprise-grade security. We use multi-factor authentication to keep your account and payments safe.",
      icon: <UserCheck className="text-blue-500" />,
      bg: "bg-blue-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Safety Hero */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
              Safe & Secure Ecosystem
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
              Your safety is our <span className="text-emerald-500">priority</span>.
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-xl">
              At FoodHub, we believe that great food should always be safe food. We've built an ecosystem where security, hygiene, and trust are the foundation of every interaction.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <ShieldCheck size={20} className="text-emerald-500" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">Verified Restaurants</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <Smartphone size={20} className="text-blue-500" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">Secure Payments</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="w-full aspect-video rounded-[3rem] bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
              <ShieldAlert size={150} className="text-white/20 absolute -right-10 -bottom-10" />
              <div className="relative z-10 text-center space-y-4">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-emerald-500 mx-auto shadow-2xl animate-float">
                  <ShieldCheck size={48} />
                </div>
                <p className="text-white font-black text-2xl tracking-tight">Ecosystem Guard™ Active</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  <span className="text-xs font-black text-white/80 uppercase tracking-widest">Real-time protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {pillars.map((p, i) => (
            <div key={i} className="group p-10 rounded-[3rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className={`w-16 h-16 ${p.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {React.cloneElement(p.icon as React.ReactElement<{ size: number }>, { size: 28 })}
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-4">{p.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Reporting Section */}
        <div className="p-12 md:p-20 rounded-[4rem] bg-zinc-900 dark:bg-white text-white dark:text-black relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Bell size={200} />
          </div>
          <div className="relative z-10 max-w-2xl space-y-8">
            <div className="flex items-center gap-2">
              <Sparkles className="text-emerald-500" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-500">Report a Concern</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">See something that doesn't seem right?</h2>
            <p className="text-white/60 dark:text-black/60 font-medium text-lg">Our safety team investigates every report. Whether it's a hygiene issue or suspicious activity, your voice helps keep the FoodHub community safe.</p>
            <button className="px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20">
              Report Security Issue
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SafetyPage;
