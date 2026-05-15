"use client";

import React from "react";
import { Scale, Shield, FileText, ChevronRight } from "lucide-react";

const TermsPage = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the FoodHub platform, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, please do not use the service."
    },
    {
      title: "2. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
    },
    {
      title: "3. Order & Delivery",
      content: "FoodHub acts as an intermediary between users and restaurants. We are not responsible for the quality of food prepared by the restaurants, although we strive to partner only with the best."
    },
    {
      title: "4. Pricing & Payments",
      content: "All prices are set by the restaurants and are subject to change without notice. Delivery fees and taxes are calculated at checkout."
    },
    {
      title: "5. Intellectual Property",
      content: "All content on this platform, including logos, text, and images, is the property of FoodHub and is protected by international copyright laws."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white text-[10px] font-black uppercase tracking-widest">
            Legal Agreement
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
            Terms & <span className="text-orange-500">Conditions</span>.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Last updated: May 12, 2026</p>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl p-10 md:p-16 space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <FileText size={18} />
                </div>
                {section.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed pl-11">
                {section.content}
              </p>
            </div>
          ))}

          <div className="pt-10 border-t border-gray-100 dark:border-white/5">
            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="text-emerald-500" size={24} />
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Questions about our terms?</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                If you have any questions regarding these terms, please contact our legal team at <span className="text-orange-500 font-bold">legal@foodhub.com</span>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsPage;
