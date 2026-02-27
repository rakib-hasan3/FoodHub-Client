"use client";

import { useEffect, useState } from "react";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user-management/users`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading)
        return <div className="p-6 text-gray-500">Loading Users...</div>;

    return (
        <div className="p-4 max-w-7xl sm:p-6">
            <h1 className="text-4xl text-center sm:text-2xl font-bold mb-8 sm:mb-6">
                Users Management 👥
            </h1>

            {/* ✅ Desktop Table */}
            <div className="hidden mt-4 md:block lg:block  bg-white rounded-xl shadow overflow-x-auto">
                <table className=" text-start  text-sm">
                    <thead className="bg-gray-200 text-xl  w-full">
                        <tr>
                            <th className=" text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Role</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Joined</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-center " >
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-3 px-4 font-medium">
                                    {user.name}
                                </td>

                                <td className="py-3 px-4 text-gray-600">
                                    {user.email}
                                </td>

                                <td className="py-3 text-gray-600 px-4">
                                    {user.role}
                                </td>

                                <td className="py-3 text-black px-4">
                                    {user.status}
                                </td>

                                <td className="py-3 px-4 text-xs text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>

                                <td className="py-3 px-4">
                                    <button className="px-3 py-1 text-xs bg-black text-black rounded">
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Mobile Cards */}
            {/* <div className="space-y-3 block lg:hidden">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white rounded-xl shadow p-4 space-y-2"
                    >
                        <div className="flex justify-between">
                            <p className="font-semibold">{user.name}</p>
                            <RoleBadge role={user.role} />
                        </div>

                        <p className="text-sm text-gray-600">
                            {user.email}
                        </p>

                        <div className="flex text-black justify-between items-center">
                            {user.status}
                            <span className="text-xs text-gray-500">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <button className="w-full mt-2 py-2 text-sm bg-black text-black rounded">
                            Manage User
                        </button>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

function RoleBadge({ role }: { role: string }) {
    const color =
        role === "ADMIN"
            ? "bg-purple-500"
            : role === "PROVIDER"
                ? "bg-blue-500"
                : "bg-gray-500";

    return (
        <span
            className={`px-2 py-1 rounded-full text-white text-xs ${color}`}
        >
            {role}
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    const color =
        status === "ACTIVE"
            ? "bg-green-500"
            : "bg-red-500";

    return (
        <span
            className={`px-2 py-1 rounded-full text-white text-xs ${color}`}
        >
            {status}
        </span>
    );
}
