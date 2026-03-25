"use client";

import { useState } from "react";
import { authClient } from "../../../../auth-client";
import { Button } from "@/components/ui/button";

const EditProfilePage = () => {
    const { data: session } = authClient.useSession();

    const [name, setName] = useState(session?.user.name || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true);

            await fetch("/api/profile/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            window.location.href = "/profile";
        } finally {
            setLoading(false);
        }
    };

    if (!session) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

            {/* Card */}
            <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Edit Profile
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Update your personal information
                    </p>
                </div>

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                        {session.user.name?.charAt(0)}
                    </div>
                </div>

                {/* Input */}
                <div className="mb-5">
                    <label className="text-sm font-medium text-gray-600">
                        Full Name
                    </label>
                    <input
                        className="w-full mt-2 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-xl p-3 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                {/* Button */}
                <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-semibold transition active:scale-95"
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Save Changes"}
                </Button>

            </div>
        </div>
    );
};

export default EditProfilePage;