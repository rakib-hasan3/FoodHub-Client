"use client"
import { useState, useEffect } from "react";
import { Plus, LayoutGrid, Edit, Trash2, Loader2, X, FolderOpen } from "lucide-react";

interface Category {
    id: string;
    name: string;
    _count?: {
        meals: number;
    };
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ১. ডাটা ফেচ করার ফাংশন
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
                credentials: "include",
                cache: 'no-store'
            });
            const result = await response.json();


            if (result.success && Array.isArray(result.data)) {
                setCategories(result.data);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    // ২. নতুন ক্যাটাগরি তৈরি করার ফাংশন
    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ name: name })
            });

            if (response.status === 401) {
                alert("আপনার সেশন শেষ হয়ে গেছে, দয়া করে আবার লগইন করুন।");
                return;
            }

            if (response.ok) {
                setName("");
                setIsModalOpen(false);
                fetchCategories(); // নতুন ক্যাটাগরি লিস্টে যোগ করার জন্য পুনরায় ফেচ
                // সফল হলে ছোট একটি নোটিফিকেশন বা অ্যালার্ট
            }
        } catch (error) {
            console.error("Create error:", error);
            alert("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* হেডার সেকশন */}
            <div className="flex items-center justify-between border-b pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
                    <p className="text-gray-500 text-sm">Create and organize your food categories</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95 font-medium"
                >
                    <Plus size={20} />
                    <span>Add Category</span>
                </button>
            </div>

            {/* ক্যাটাগরি লিস্ট গ্রিড */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader2 className="animate-spin text-blue-600" size={48} />
                    <p className="text-gray-400 animate-pulse">Loading categories...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <div
                                key={category.id}
                                className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            <LayoutGrid size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-xl capitalize">{category.name}</h3>
                                            <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider font-mono">ID: {category.id.slice(0, 8)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                            <Edit size={18} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                {/* কার্ডের নিচে ডেকোরেটিভ বর্ডার */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                            <FolderOpen size={64} className="text-gray-200 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-400">No Categories Found</h3>
                            <p className="text-gray-400 text-sm">Start by adding a new category above.</p>
                        </div>
                    )}
                </div>
            )}

            {/* --- Create Category Modal --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">New Category</h2>
                                <p className="text-blue-100 text-xs">Add a name for your new category</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateCategory} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Category Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Fast Food, Drinks"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none text-black transition-all"
                                />
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3.5 border border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 font-bold disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Create Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}