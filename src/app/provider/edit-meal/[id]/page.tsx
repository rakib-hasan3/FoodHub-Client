"use client";
import { motion, AnimatePresence } from "framer-motion";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Save, Utensils, IndianRupee, Clock, Flame, Users, Info, Image as ImageIcon, CheckCircle2, ArrowLeft } from "lucide-react";

type Category = { id: string; name: string };

const EditMealPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        category_id: "",
        status: "AVAILABLE",
        description: "",
        image_url: "",
        featured: false,
        trending: false,
        isAvailable: true,
        // Discount Fields
        isDiscounted: false,
        discountPercent: "",
        offerText: "",
        offerExpiresAt: "",
        preparationTime: "",
        calories: "",
        spiceLevel: "NONE",
        servingSize: "",
        ingredients: "",
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories
                const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                const catData = await catRes.json();
                if (catData.success) setCategories(catData.data);

                // Fetch Meal Data
                const mealRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals/${id}`);
                const mealData = await mealRes.json();

                if (mealData.success) {
                    const m = mealData.data;
                    setForm({
                        name: m.name || "",
                        price: m.price?.toString() || "",
                        category_id: m.category_id || "",
                        status: m.status || "AVAILABLE",
                        description: m.description || "",
                        image_url: m.image_url || "",
                        featured: m.featured || false,
                        trending: m.trending || false,
                        isAvailable: m.isAvailable !== undefined ? m.isAvailable : true,
                        // Discount Mapping
                        isDiscounted: m.isDiscounted || false,
                        discountPercent: m.discountPercent?.toString() || "",
                        offerText: m.offerText || "",
                        offerExpiresAt: m.offerExpiresAt ? new Date(m.offerExpiresAt).toISOString().split('T')[0] : "",
                        preparationTime: m.preparationTime || "",
                        calories: m.calories?.toString() || "",
                        spiceLevel: m.spiceLevel || "NONE",
                        servingSize: m.servingSize || "",
                        ingredients: Array.isArray(m.ingredients) ? m.ingredients.join(", ") : "",
                    });
                } else {
                    toast.error("Meal not found");
                    router.push("/provider/my-meal");
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load meal data");
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setForm({ ...form, [name]: checked });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...form,
            price: Number(form.price),
            discountPercent: Number(form.discountPercent) || 0,
            isDiscounted: Boolean(form.isDiscounted),
            offerText: form.offerText || null,
            offerExpiresAt: form.offerExpiresAt ? new Date(form.offerExpiresAt).toISOString() : null,
            calories: form.calories ? Number(form.calories) : null,
            ingredients: form.ingredients.split(",").map(i => i.trim()).filter(i => i !== ""),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Meal updated successfully!");
                router.push("/provider/my-meal");
            } else {
                toast.error(data.message || "Failed to update meal");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while updating the meal");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-black px-4 py-8 md:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Information Section */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-6">

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">

                                Refine Your <span className="text-orange-500">Signature</span> Dish.
                            </h1>
                            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-md">
                                Keep your menu fresh and accurate. High-quality updates maintain customer trust and improve loyalty.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-5">
                                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                                    <Save className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Instant Updates</h3>
                                    <p className="text-sm text-gray-500 mt-1">Changes are applied immediately across all customer apps. Review your pricing carefully.</p>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                                    <Flame className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Seasonal Tuning</h3>
                                    <p className="text-sm text-gray-500 mt-1">Adjust spice levels or ingredients based on seasonal availability and customer feedback.</p>
                                </div>
                            </div>
                        </div>

                        {/* Professional Note */}
                        <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                    <Info className="w-6 h-6 text-blue-500" />
                                </div>
                                <h4 className="text-white font-bold">Optimization Tip</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Adding "Featured" status to your top-rated meals can increase visibility in the home banner by up to 3x.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Edit Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-900 to-black p-8 md:p-10 border-b border-white/5">
                                <h2 className="text-white font-bold text-xl flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <Save className="w-4 h-4 text-white" />
                                    </div>
                                    Edit Specifications
                                </h2>
                            </div>

                            <form className="p-8 md:p-12 space-y-12" onSubmit={handleSubmit}>
                                {/* Basic Information */}
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Meal Designation</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-2xl px-6 transition-all outline-none text-gray-800 dark:text-white font-semibold border"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Price (৳)</label>
                                            <div className="relative group">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">৳</span>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={form.price}
                                                    onChange={handleChange}
                                                    className="w-full h-14 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-green-500 focus:ring-4 focus:ring-green-500/5 rounded-2xl pl-12 pr-6 transition-all outline-none text-gray-800 dark:text-white font-semibold border"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Menu Classification</label>
                                            <select
                                                name="category_id"
                                                value={form.category_id}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-2xl px-6 transition-all outline-none text-gray-800 dark:text-white font-semibold border appearance-none cursor-pointer"
                                                required
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Spice Intensity</label>
                                            <select
                                                name="spiceLevel"
                                                value={form.spiceLevel}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-red-500 focus:ring-4 focus:ring-red-500/5 rounded-2xl px-6 transition-all outline-none text-gray-800 dark:text-white font-semibold border appearance-none cursor-pointer"
                                            >
                                                <option value="NONE">Not Spicy</option>
                                                <option value="MILD">Mild Heat</option>
                                                <option value="MEDIUM">Standard Spicy</option>
                                                <option value="HOT">Hot</option>
                                                <option value="EXTRA_HOT">Extreme Heat</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Discount Section */}
                                <div className="space-y-8 pt-8 border-t border-gray-100 dark:border-white/5">
                                    <div className="flex items-center justify-between p-6 bg-orange-50/50 dark:bg-orange-500/5 rounded-[2rem] border border-orange-100 dark:border-orange-500/20">
                                        <div className="space-y-1">
                                            <h4 className="font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest text-xs">Promotional Discount</h4>
                                            <p className="text-xs text-gray-500 font-medium">Apply a discount to this meal to attract more customers.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" name="isDiscounted" checked={form.isDiscounted} onChange={handleChange} className="sr-only peer" />
                                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-500 shadow-sm"></div>
                                        </label>
                                    </div>

                                    <AnimatePresence>
                                        {form.isDiscounted && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-8 overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Discount Percentage (%)</label>
                                                        <div className="relative group">
                                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                                                            <input
                                                                type="number"
                                                                name="discountPercent"
                                                                value={form.discountPercent}
                                                                onChange={handleChange}
                                                                placeholder="10"
                                                                min="1"
                                                                max="100"
                                                                className="w-full h-14 bg-white dark:bg-black border-orange-200 dark:border-orange-500/30 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 rounded-2xl px-6 transition-all outline-none text-gray-800 dark:text-white font-semibold border"
                                                                required={form.isDiscounted}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Offer Expiry Date</label>
                                                        <input
                                                            type="date"
                                                            name="offerExpiresAt"
                                                            value={form.offerExpiresAt}
                                                            onChange={handleChange}
                                                            className="w-full h-14 bg-white dark:bg-black border-orange-200 dark:border-orange-500/30 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 rounded-2xl px-6 transition-all outline-none text-gray-800 dark:text-white font-semibold border appearance-none"
                                                            required={form.isDiscounted}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Promotional Text</label>
                                                    <input
                                                        type="text"
                                                        name="offerText"
                                                        value={form.offerText}
                                                        onChange={handleChange}
                                                        placeholder="e.g. Weekend Special, Ramadan Combo..."
                                                        className="w-full h-14 bg-white dark:bg-black border-orange-200 dark:border-orange-500/30 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 rounded-2xl px-6 transition-all outline-none text-gray-800 dark:text-white font-semibold border"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Detailed Content */}
                                <div className="space-y-8 pt-8 border-t border-gray-100 dark:border-white/5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" /> Prep Time
                                            </label>
                                            <input type="text" name="preparationTime" value={form.preparationTime} onChange={handleChange} className="w-full h-12 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl px-4 text-sm font-bold border" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                                                <Flame className="w-3 h-3" /> Calories
                                            </label>
                                            <input type="number" name="calories" value={form.calories} onChange={handleChange} className="w-full h-12 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl px-4 text-sm font-bold border" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                                                <Users className="w-3 h-3" /> Serving
                                            </label>
                                            <input type="text" name="servingSize" value={form.servingSize} onChange={handleChange} className="w-full h-12 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 rounded-xl px-4 text-sm font-bold border" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Ingredients Breakdown</label>
                                        <textarea
                                            name="ingredients"
                                            value={form.ingredients}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full p-5 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-black rounded-2xl transition-all outline-none text-sm font-semibold border resize-none leading-relaxed"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Culinary Description</label>
                                        <textarea
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full p-5 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-black rounded-2xl transition-all outline-none text-sm font-semibold border resize-none leading-relaxed"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Master Image URL</label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                                                <ImageIcon className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="text"
                                                name="image_url"
                                                value={form.image_url}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-black rounded-2xl pl-14 pr-6 transition-all outline-none text-sm font-bold border"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Status Switches */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                                    <label className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer group ${form.featured ? 'border-orange-500 bg-orange-50/30' : 'border-gray-50 bg-gray-50/30 hover:border-orange-200'}`}>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${form.featured ? 'text-orange-600' : 'text-gray-400'}`}>Featured</span>
                                        <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-5 h-5 accent-orange-500" />
                                    </label>
                                    <label className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer group ${form.trending ? 'border-pink-500 bg-pink-50/30' : 'border-gray-50 bg-gray-50/30 hover:border-pink-200'}`}>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${form.trending ? 'text-pink-600' : 'text-gray-400'}`}>Trending</span>
                                        <input type="checkbox" name="trending" checked={form.trending} onChange={handleChange} className="w-5 h-5 accent-pink-500" />
                                    </label>
                                    <label className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer group ${form.isAvailable ? 'border-green-500 bg-green-50/30' : 'border-gray-50 bg-gray-50/30 hover:border-green-200'}`}>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${form.isAvailable ? 'text-green-600' : 'text-gray-400'}`}>Available</span>
                                        <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange} className="w-5 h-5 accent-green-500" />
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-20 bg-gray-900 hover:bg-black text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-gray-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 disabled:bg-gray-200 disabled:shadow-none"
                                >
                                    {loading ? "SAVING CHANGES..." : "CONFIRM UPDATES"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMealPage;
