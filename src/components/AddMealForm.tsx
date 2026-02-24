// components/AddMealForm.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddMealForm() {
    return (
        <form className="space-y-4 bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Add New Food Item</h3>

            <div>
                <label className="block text-sm font-medium mb-1">Meal Name</label>
                <input type="text" className="w-full border p-2 rounded-md" placeholder="e.g. Grilled Chicken" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Price (৳)</label>
                    <input type="number" className="w-full border p-2 rounded-md" placeholder="250" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select className="w-full border p-2 rounded-md">
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Snacks</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Food Image URL</label>
                <input type="text" className="w-full border p-2 rounded-md" placeholder="Paste ImgBB link here" />
            </div>

            <Button className="w-full bg-primary text-white py-2">Publish Meal</Button>
        </form>
    );
}