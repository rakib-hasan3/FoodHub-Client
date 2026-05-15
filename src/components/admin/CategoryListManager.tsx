"use client";

import { useState } from "react";
import { Plus, LayoutGrid, Edit, Trash2, Loader2, X, FolderOpen, Tag, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Category {
    id: string;
    name: string;
    image?: string;
    _count?: {
        meals: number;
    };
}

export default function CategoryListManager({ initialCategories }: { initialCategories: Category[] }) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const refreshCategories = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        const result = await response.json();
        if (result.success) setCategories(result.data);
    };

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, image: image })
            });

            if (response.ok) {
                setName("");
                setImage("");
                setIsModalOpen(false);
                refreshCategories();
                toast.success("New category registered in ecosystem");
            } else {
                toast.error("Failed to register category");
            }
        } catch (error) {
            console.error("Create error:", error);
            toast.error("Protocol failure. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Tag className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">Taxonomy Control</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Global Categories</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Organize and classify the culinary landscape</p>
                </div>
                
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zinc-900/10"
                >
                    <Plus size={18} />
                    <span>Initialize Category</span>
                </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/20 dark:shadow-none hover:border-orange-500/30 dark:hover:border-orange-500/20 transition-all duration-500 overflow-hidden"
                        >
                            <div className="flex flex-col h-full justify-between relative z-10">
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-400 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-orange-500/30 group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                                        {category.image ? (
                                            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <LayoutGrid size={28} />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 dark:text-white text-2xl tracking-tighter capitalize group-hover:text-orange-500 transition-colors">{category.name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">System Hash:</span>
                                            <span className="font-mono text-[9px] font-black text-orange-500/60">{category.id.slice(0, 10).toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50 dark:border-white/5">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Units:</span>
                                        <span className="text-sm font-black text-gray-900 dark:text-white">{category._count?.meals || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2.5 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-blue-500 rounded-xl transition-all">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2.5 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-rose-500 rounded-xl transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-orange-500/[0.03] dark:bg-white/[0.02] rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all duration-700" />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-32 bg-gray-50/50 dark:bg-white/[0.01] rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-700 mb-6">
                            <FolderOpen size={40} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Ecosystem Empty</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-[250px] mt-2">Initialize your first classification to begin organization</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-transparent dark:border-white/5">
                        <div className="p-10 space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-orange-500" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">System Entry</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Initialize</h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-400 hover:text-rose-500 transition-all">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleCreateCategory} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Classification Identity</label>
                                        <div className="relative group">
                                            <input
                                                autoFocus
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="e.g. Gourmet Fast Food"
                                                className="w-full px-8 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-800 outline-none text-gray-900 dark:text-white font-black transition-all"
                                            />
                                            <Tag className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Visual Asset URL (Optional)</label>
                                        <div className="relative group">
                                            <input
                                                type="url"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                                className="w-full px-8 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-800 outline-none text-gray-900 dark:text-white font-black transition-all"
                                            />
                                            <LayoutGrid className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="py-4 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">Abort</button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-zinc-900/10 transition-all"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (
                                            <>Commit <ArrowRight size={18} /></>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
