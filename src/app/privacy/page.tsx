"use client";

import React from "react";
import { Shield, Eye, Lock, Database, Bell } from "lucide-react";

const PrivacyPage = () => {
  const policies = [
    {
      title: "Data Collection",
      icon: <Database className="text-blue-500" />,
      content: "We collect information you provide directly to us, such as when you create an account, place an order, or communicate with us. This may include your name, email address, phone number, and delivery address."
    },
    {
      title: "How We Use Your Data",
      icon: <Eye className="text-emerald-500" />,
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, and send you technical notices and support messages."
    },
    {
      title: "Information Sharing",
      icon: <Shield className="text-orange-500" />,
      content: "We share your delivery information with restaurants and delivery partners only to fulfill your orders. We do not sell your personal information to third parties."
    },
    {
      title: "Data Security",
      icon: <Lock className="text-rose-500" />,
      content: "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
            Privacy Matters
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
            Privacy <span className="text-emerald-500">Policy</span>.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Your privacy is our top priority. Learn how we handle your data.</p>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 gap-8">
          {policies.map((policy, i) => (
            <div key={i} className="group p-10 bg-white dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(policy.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{policy.title}</h2>
                  <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {policy.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center p-12 rounded-[3.5rem] bg-zinc-900 dark:bg-white text-white dark:text-black">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bell size={24} className="text-emerald-500" />
            <h3 className="text-xl font-black">Policy Updates</h3>
          </div>
          <p className="text-white/60 dark:text-black/60 font-medium max-w-2xl mx-auto">
            We may update this privacy policy from time to time. If we make significant changes, we will notify you by email or through a notice on our platform.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPage;
