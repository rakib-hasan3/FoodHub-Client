"use client";

import { useEffect, useState } from "react";

type Meal = {
    id: string;
    name: string;
    price: string;
    status: string;
    image_url: string;
    provider: {
        restaurant_name: string;
    };
    category: {
        name: string;
    };
};

export default function MealsPage() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/meals", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setMeals(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-6">Loading meals...</div>;

    return (
        <div className="p-4 mb-8 md:p-6">
            <h1 className="text-xl text-center p-4 font-bold mb-6">Meals Management 🍽️</h1>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full w-full text-center text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">Meal</th>
                            <th className="py-3 px-4 text-left">Provider</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {meals.map((meal) => (
                            <tr key={meal.id} className="border-b text-center">
                                <td className="py-3 px-4 gap-4 text-center lg:mr-4 flex items-center ">

                                    <span> {meal.name} </span>
                                </td>

                                <td className="py-3 px-4">
                                    {meal.provider.restaurant_name}
                                </td>

                                <td className="py-3 px-4">
                                    {meal.category.name}
                                </td>

                                <td className="py-3 px-4">${meal.price}</td>

                                <td className="py-3 px-4">
                                    <StatusBadge status={meal.status} />
                                </td>

                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => setSelectedMeal(meal)}
                                        className="px-3 py-1 text-xs bg-black rounded"
                                    >
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedMeal && (
                <ManageMealModal
                    meal={selectedMeal}
                    onClose={() => setSelectedMeal(null)}
                />
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const color =
        status === "AVAILABLE"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600";

    return (
        <span className={`px-2 py-1  rounded text-xs font-medium ${color}`}>
            {status}
        </span>
    );
}

function ManageMealModal({
    meal,
    onClose,
}: {
    meal: Meal;
    onClose: () => void;
}) {
    const [status, setStatus] = useState(meal.status);

    const handleStatusChange = async () => {
        await fetch(
            `http://localhost:5000/api/meals/${meal.id}/status`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status }),
            }
        );

        onClose();
        location.reload();
    };

    const handleDelete = async () => {
        const confirmDelete = confirm("Delete this meal?");
        if (!confirmDelete) return;

        await fetch(`http://localhost:5000/api/meals/${meal.id}`, {
            method: "DELETE",
            credentials: "include",
        });

        onClose();
        location.reload();
    };

    return (
        <div className="fixed mt-4  inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 w-full max-w-md space-y-4">
                <h2 className="text-xl text-center font-bold">Manage Meal</h2>

                <div>
                    <p className="text-lg text-gray-500">Meal</p>
                    <p className="font-medium">{meal.name}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">${meal.price}</p>
                </div>

                <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border rounded p-2 mt-1"
                    >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="UNAVAILABLE">UNAVAILABLE</option>
                    </select>
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        onClick={handleStatusChange}
                        className="flex-1 bg-green-600 text-white py-2 rounded"
                    >
                        Update
                    </button>

                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-600 text-white py-2 rounded"
                    >
                        Delete
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="w-full text-sm text-gray-500"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
