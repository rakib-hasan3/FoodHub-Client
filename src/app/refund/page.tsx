"use client";

import React from "react";
import { RefreshCcw, CheckCircle2, XCircle, Clock, CreditCard } from "lucide-react";

const RefundPage = () => {
  const steps = [
    {
      title: "Request Refund",
      desc: "Submit a request via the app or contact support within 24 hours of your order.",
      icon: <RefreshCcw size={24} />
    },
    {
      title: "Review Process",
      desc: "Our team validates the issue with the restaurant and delivery partner.",
      icon: <Clock size={24} />
    },
    {
      title: "Approval",
      desc: "If valid, the refund is approved and initiated immediately.",
      icon: <CheckCircle2 size={24} />
    },
    {
      title: "Fund Receipt",
      desc: "Funds appear in your account within 3-5 business days depending on your bank.",
      icon: <CreditCard size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest">
            Refund Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
            Fair & Transparent <br /> <span className="text-rose-500">Refunds</span>.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 font-medium">
            We understand that sometimes things don't go as planned. Our refund policy is designed to be fair to both our customers and our restaurant partners.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
          <div className="p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Eligible for Refund</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Incorrect items delivered",
                "Significant delay (over 60 mins beyond estimate)",
                "Food quality issues (safety or hygiene)",
                "Missing items from your order",
                "Order never arrived"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10 rounded-[3rem] bg-rose-500/5 border border-rose-500/10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white">
                <XCircle size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Not Eligible</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Change of mind after preparation started",
                "Incorrect delivery address provided",
                "Subjective taste preferences",
                "Customer unavailable at delivery location",
                "Issues reported after 24 hours"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group text-center space-y-4">
                <div className="w-20 h-20 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-[2rem] shadow-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:border-rose-500/30 transition-all duration-500">
                  <div className="text-rose-500">{step.icon}</div>
                </div>
                <h4 className="text-lg font-black text-gray-900 dark:text-white">{step.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RefundPage;
