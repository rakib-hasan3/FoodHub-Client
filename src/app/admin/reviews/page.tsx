"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/admin/layout";

type Review = {
    id: string;
    rating: number;
    comment: string;
    user: {
        name: string;
    };
    meal: {
        name: string;
    };
    createdAt?: string;
};

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/reviews/admin/reviews", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setReviews(data.reviews);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-6">Loading Reviews...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-slate-800">Reviews</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 space-y-4 p-6">
                {reviews && reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    {/* এখানে ?.name ব্যবহার করা হয়েছে */}
                                    <p className="font-semibold text-slate-900">{review.user?.name || "Anonymous User"}</p>
                                    {/* এখানেও ?.name */}
                                    <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">
                                        {review.meal?.name || "Unknown Meal"}
                                    </p>
                                </div>
                                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                                    <span className="text-yellow-500 text-xs mr-1">⭐</span>
                                    <span className="text-sm font-bold text-yellow-700">{review.rating}</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-3 italic">{review.comment}</p>
                            <p className="text-[10px] text-slate-400 mt-2">
                                {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-slate-400 italic">
                        No reviews found yet.
                    </div>
                )}
            </div>
        </div>
    );
}
