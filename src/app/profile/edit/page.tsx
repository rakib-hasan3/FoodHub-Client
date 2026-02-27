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
                body: JSON.stringify({ name }),
            });

            window.location.href = "/profile";
        } finally {
            setLoading(false);
        }
    };

    if (!session) return null;

    return (
        <div className="w-full flex justify-center">
            <div className="w-full  bg-white p-4 py-4 rounded-2xl shadow">
                <h1 className="text-xl text-center font-semibold mb-4">Edit Profile</h1>

                <div className="mb-4">
                    <label className="text-sm text-gray-500">Name</label>
                    <input
                        className="w-full mb-2 border rounded-lg p-4 mt-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <Button
                    className="w-full"
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Name"}
                </Button>
            </div>
        </div>
    );
};

export default EditProfilePage;