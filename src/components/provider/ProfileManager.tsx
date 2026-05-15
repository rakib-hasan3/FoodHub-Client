"use client";

import { useState } from "react";
import { Phone, MapPin, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

type Profile = {
    providerName: string;
    phone: string;
    address: string;
    image?: string;
};

export default function ProfileManager({ 
    initialProfile, 
    userId 
}: { 
    initialProfile: Profile | null, 
    userId: string 
}) {
    const [profile, setProfile] = useState<Profile | null>(initialProfile);
    const [isEditing, setIsEditing] = useState(!initialProfile);
    const [formData, setFormData] = useState<Profile>(initialProfile || {
        providerName: "",
        phone: "",
        address: "",
        image: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.providerName || !formData.phone || !formData.address) {
            toast.error("Please fill required fields");
            return;
        }

        const payload = {
            restaurant_name: formData.providerName,
            contact_number: formData.phone,
            address: formData.address,
            image: formData.image || null,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success("Profile saved successfully");
                setProfile(formData);
                setIsEditing(false);
            } else {
                toast.error("Failed to save profile");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {!isEditing && profile ? (
                <div className="relative max-w-xl bg-white dark:bg-zinc-900 shadow-xl dark:shadow-none rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/5 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-700" />
                    
                    <div className="flex items-center gap-6 mb-10 relative z-10">
                        <div className="relative">
                            <img
                                src={profile.image || "https://placehold.co/150x150?text=Avatar"}
                                alt="profile"
                                className="w-32 h-32 rounded-[2rem] object-cover border-4 border-white dark:border-zinc-800 shadow-2xl transition-transform group-hover:rotate-3"
                            />
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                                <Sparkles size={18} />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                                {profile.providerName}
                            </h2>
                            <p className="text-xs text-orange-500 font-black uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                Elite Provider
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 text-gray-700 dark:text-gray-300 relative z-10">
                        <div className="flex items-center gap-5 bg-gray-50 dark:bg-white/5 px-6 py-5 rounded-3xl border border-transparent dark:border-white/5">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <Phone size={20} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Line</p>
                                <p className="font-bold text-lg">{profile.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 bg-gray-50 dark:bg-white/5 px-6 py-5 rounded-3xl border border-transparent dark:border-white/5">
                            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                                <MapPin size={20} className="text-rose-600 dark:text-rose-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Headquarters</p>
                                <p className="font-bold text-lg">{profile.address}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-10 w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl shadow-zinc-900/20 active:scale-95"
                    >
                        Refine Profile
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl bg-white dark:bg-zinc-900 shadow-xl dark:shadow-none rounded-[3rem] p-8 md:p-12 space-y-8 border border-gray-100 dark:border-white/5 relative overflow-hidden"
                >
                    <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[80px] -z-10" />

                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                            {profile ? "Enhance Profile" : "Create Identity"}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Define your brand presence on FoodHub</p>
                    </div>

                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Restaurant Title *</label>
                            <input
                                name="providerName"
                                value={formData.providerName}
                                onChange={handleChange}
                                placeholder="e.g. Sultan's Dine"
                                className="w-full h-16 px-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Secure Contact *</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="017XXXXXXXX"
                                className="w-full h-16 px-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Physical Location *</label>
                            <input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Dhanmondi, Dhaka"
                                className="w-full h-16 px-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Brand Visual (URL)</label>
                            <input
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full h-16 px-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {profile && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest bg-gray-100 dark:bg-white/5 text-gray-500 transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="flex-[2] bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl shadow-orange-500/20 active:scale-95"
                        >
                            Save Identity
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
