"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "../../../../auth-client";

type Profile = {
    providerName: string;
    phone: string;
    address: string;
    image?: string;
};

export default function ProviderProfile() {
    const { data: session, isPending: sessionLoading } = authClient.useSession();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<Profile>({
        providerName: "",
        phone: "",
        address: "",
        image: "",
    });

    const userId = session?.user?.id;

    // Load Profile
    useEffect(() => {
        const loadProfile = async () => {
            if (sessionLoading || !userId) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/provider/getprofile`,
                    {
                        credentials: "include",
                    }
                );

                if (res.ok) {
                    const data = await res.json();

                    if (data) {
                        const formatted = {
                            providerName: data.restaurant_name,
                            phone: data.contact_number,
                            address: data.address,
                            image: data.image || "",
                        };

                        setProfile(formatted);
                        setFormData(formatted);
                    }
                }
            } catch (error) {
                console.error("Profile fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [userId, sessionLoading]);

    // Handle input
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit profile
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userId) {
            toast.error("You must be logged in");
            return;
        }

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
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(payload),
                }
            );

            const result = await res.json();
            console.log("Server Response:", result);

            if (res.ok) {
                toast.success("Profile saved successfully");
                setProfile(formData);
            } else {
                toast.error(result.error || "Failed to save profile");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
        }
    };

    if (loading || sessionLoading) {
        return <p className="p-6 text-center">Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                Provider Profile
            </h1>

            {profile ? (
                <div className="relative max-w-xl mx-auto bg-gradient-to-br from-orange-100 via-white to-green-100 shadow-xl rounded-3xl p-6 border border-gray-100">

                    {/* Top Section */}
                    <div className="flex items-center gap-5 mb-6">
                        <img
                            src={profile.image || "/avatar.png"}
                            alt="profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-orange-400 shadow-md"
                        />

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {profile.providerName}
                            </h2>
                            <p className="text-sm text-orange-500 font-semibold">
                                🍽 Food Provider
                            </p>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-3 text-gray-700">
                        <p className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm">
                            <Phone size={16} className="text-green-500" />
                            {profile.phone}
                        </p>

                        <p className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm">
                            <MapPin size={16} className="text-red-500" />
                            {profile.address}
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => setProfile(null)}
                        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        ✏️ Edit Profile
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl mx-auto bg-white shadow-xl rounded-3xl p-6 space-y-5 border border-gray-100"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Create / Update Profile
                    </h2>

                    {/* Input */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Restaurant Name *
                        </label>
                        <input
                            name="providerName"
                            value={formData.providerName}
                            onChange={handleChange}
                            placeholder="Ex: Chillox"
                            className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Phone Number *
                        </label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="017xxxxxxxx"
                            className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Address *
                        </label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Dhanmondi, Dhaka"
                            className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Image URL
                        </label>
                        <input
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://image-link.com"
                            className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        🚀 Save Profile
                    </button>
                </form>
            )}
        </div>
    );
}