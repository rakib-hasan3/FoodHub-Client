"use client";

import React, { useState } from "react";
import { 
  Search, 
  HelpCircle, 
  Truck, 
  CreditCard, 
  User, 
  ShieldCheck, 
  ChevronDown,
  MessageCircle,
  Mail,
  Phone
} from "lucide-react";

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("Getting Started");

  const faqs = [
    {
      q: "How do I place an order on FoodHub?",
      a: "To place an order, simply browse through our categories or search for a specific meal, add it to your cart, and proceed to checkout. You'll need to provide your delivery address and choose a payment method.",
      category: "Getting Started"
    },
    {
      q: "What are the delivery charges?",
      a: "Delivery charges vary depending on your distance from the restaurant and any ongoing promotions. You can see the exact delivery fee at the checkout page before confirming your order.",
      category: "Delivery"
    },
    {
      q: "Can I cancel my order after placing it?",
      a: "Orders can only be cancelled if the restaurant hasn't started preparing your food. Once the preparation begins, cancellation is usually not possible. Contact support immediately for urgent requests.",
      category: "Orders"
    },
    {
      q: "Is my payment information secure?",
      a: "Yes, we use industry-standard encryption and secure payment gateways to ensure your financial data is always protected. We do not store your full credit card details on our servers.",
      category: "Payments"
    }
  ];

  const categories = [
    { name: "Getting Started", icon: <HelpCircle /> },
    { name: "Orders", icon: <User /> },
    { name: "Delivery", icon: <Truck /> },
    { name: "Payments", icon: <CreditCard /> },
    { name: "Account Safety", icon: <ShieldCheck /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Help Hero */}
        <div className="text-center space-y-8 mb-24 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-black uppercase tracking-widest">
            Help Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">help</span> you?
          </h1>
          
          <div className="max-w-2xl mx-auto relative group mt-10">
            <div className="absolute inset-y-0 left-6 flex items-center text-gray-400 group-focus-within:text-orange-500 transition-colors">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Search for articles, questions, or topics..."
              className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[2.5rem] shadow-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-900 outline-none text-gray-900 dark:text-white font-bold text-lg transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-4 mb-6">Categories</h3>
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setActiveTab(cat.name)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activeTab === cat.name 
                  ? "bg-zinc-900 text-white shadow-xl dark:bg-white dark:text-black" 
                  : "bg-white dark:bg-zinc-900/50 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <div className={`${activeTab === cat.name ? "text-orange-500" : "text-gray-400"}`}>
                  {React.cloneElement(cat.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between mb-2 px-2">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{activeTab}</h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{faqs.filter(f => f.category === activeTab).length} Articles Found</span>
            </div>

            <div className="space-y-4">
              {faqs.filter(f => activeTab === "All" || f.category === activeTab).map((faq, i) => (
                <div key={i} className="group p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 shadow-xl hover:border-orange-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between cursor-pointer">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-orange-500 transition-colors">{faq.q}</h3>
                    <ChevronDown size={20} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Support CTA */}
            <div className="mt-20 p-12 rounded-[3.5rem] bg-orange-500 relative overflow-hidden text-white text-center md:text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/50 to-transparent" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tighter">Still need help?</h2>
                  <p className="text-white/80 font-medium text-lg max-w-md">Our support team is available 24 hours a day, 7 days a week to help you with anything you need.</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button className="px-8 py-4 bg-white text-orange-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <MessageCircle size={18} /> Chat with us
                  </button>
                  <button className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                    Email Support
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default HelpPage;
