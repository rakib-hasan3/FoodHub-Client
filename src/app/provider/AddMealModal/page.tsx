"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string };

const AddMealPage = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        category_id: "",
        status: "AVAILABLE",
        description: "",
        image_url: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                const data = await res.json();
                if (data.success) setCategories(data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("session_token"); // যেটা login এ save
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // ✅ send cookies
                body: JSON.stringify(form),
            });


            const data = await res.json();

            if (data.success) {
                alert("Meal added successfully!");
                router.push(`/provider/dashboard?refresh=${Date.now()}`);
            } else {
                alert("Failed to add meal: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Error adding meal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2 mt-4">Add New Meal</h1>

            <form className="space-y-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Meal Name"
                    className="w-full p-4 border rounded-md"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price (৳)"
                    className="w-full p-4 border rounded-md"
                    required
                />
                <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    className="w-full p-4 border rounded-md"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full p-4 border rounded-md"
                >
                    <option value="AVAILABLE">Available</option>
                    <option value="UNAVAILABLE">Unavailable</option>
                </select>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Description"
                    className="w-full p-4 border rounded-md"
                />
                <input
                    type="text"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-4 border rounded-md"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 text-black border mt-4 rounded-xl hover:opacity-80 transition"
                >
                    {loading ? "Adding..." : "Add Meal"}
                </button>
            </form>
        </div>
    );
};

export default AddMealPage;