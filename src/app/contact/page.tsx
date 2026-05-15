"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Globe,
  ArrowRight
} from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header Section */}
        <div className="text-center space-y-6 mb-24 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-black uppercase tracking-widest animate-fade-in">
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
            We're here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">help</span> you.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 font-medium">
            Have a question about an order, a restaurant, or just want to say hi? Our team is available 24/7 to ensure your experience is nothing short of perfect.
          </p>

          {/* Decorative Blur */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <a href="mailto:rakibhasanashik861@gmail.com" className="block">
              <ContactInfoCard
                icon={<Mail className="text-blue-500" />}
                title="Email Us"
                value="support@foodhub.com"
                desc="Click to send an email. We usually respond within 2 hours."
                color="bg-blue-500/10"
              />
            </a>
            <a href="tel:01742401713" className="block">
              <ContactInfoCard
                icon={<Phone className="text-emerald-500" />}
                title="Call Us"
                value="01742401713"
                desc="Available Mon-Sun, 9am - 10pm for direct support."
                color="bg-emerald-500/10"
              />
            </a>
            <ContactInfoCard
              icon={<MapPin className="text-rose-500" />}
              title="Visit Us"
              value="Mouchak, Gazipur, Dhaka"
              desc="Come say hello at our local headquarters."
              color="bg-rose-500/10"
            />

            {/* Social Proof / Business Hours */}
            <div className="p-8 rounded-[2.5rem] bg-zinc-900 text-white space-y-6">
              <h3 className="text-xl font-black tracking-tight">Business Hours</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white/60">Monday - Friday</span>
                  <span className="text-sm font-black">24 Hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white/60">Saturday - Sunday</span>
                  <span className="text-sm font-black">9:00 AM - 12:00 PM</span>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Globe size={18} />
                </div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Global Support Available</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-10 md:p-16 rounded-[3rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 dark:opacity-10 pointer-events-none">
                <Send size={120} className="-rotate-12" />
              </div>

              <div className="relative z-10 space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Send us a message</h2>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-8 py-5 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none text-gray-900 dark:text-white font-bold transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-8 py-5 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none text-gray-900 dark:text-white font-bold transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Subject</label>
                    <select className="w-full px-8 py-5 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none text-gray-900 dark:text-white font-bold transition-all appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Restaurant Partnership</option>
                      <option>Technical Issue</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Message</label>
                    <textarea
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full px-8 py-5 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none text-gray-900 dark:text-white font-bold transition-all resize-none"
                    />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <button className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                      Send Message <Send size={18} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

function ContactInfoCard({ icon, title, value, desc, color }: any) {
  return (
    <div className="group p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500">
      <div className="flex items-start gap-6">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
          {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{title}</h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-tight pt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
