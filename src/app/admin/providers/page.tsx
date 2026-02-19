"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/admin/layout";

type Provider = {
    id: string;
    businessName: string;
    email: string;
    status: string;
};

export default function ProvidersPage() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/provider", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setProviders(data.providers);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-6">Loading Providers...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Providers</h1>

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left">Business Name</th>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers?.map(provider => (
                            <tr key={provider.id} className="border-b">
                                <td className="py-2 px-4">{provider.businessName}</td>
                                <td className="py-2 px-4">{provider.email}</td>
                                <td className="py-2 px-4">{provider.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
