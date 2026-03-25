"use client";

import { useEffect, useState } from "react";
import { User as UserIcon, Mail, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user-management/users`, {
                credentials: "include",
            });
            const data = await res.json();
            setUsers(data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (userId: string, currentStatus: string) => {
        try {
            setUpdatingId(userId);
            const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

            // Optimistic Update: সাথে সাথে UI চেঞ্জ হবে
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
            );

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user-management/users/${userId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update");

            toast.success(`User is now ${newStatus}`);
        } catch (err) {
            toast.error("Status update failed");
            // ভুল হলে আবার আগের স্টেটে ফেরত নেওয়া
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, status: currentStatus } : u))
            );
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500 animate-pulse font-medium">Loading Users List...</div>;

    return (
        <div className="p-4 max-w-7xl mx-auto space-y-2">
            <div className="text-center  border-b border-gray-100 pb-5">
                <h1 className="text-3xl sm:text-3xl font-black text-gray-800 tracking-tight">Users Management 👥</h1>
                <p className="text-gray-500 text-sm">Review user roles and control account status</p>
            </div>

            {/* ✅ Mobile View (Cards) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {users.map((user) => (
                    <div key={user.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                    {user.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{user.name}</p>
                                    <RoleBadge role={user.role} />
                                </div>
                            </div>
                            <ToggleSwitch
                                active={user.status === "ACTIVE"}
                                onToggle={() => handleToggleStatus(user.id, user.status)}
                                loading={updatingId === user.id}
                            />
                        </div>

                        <div className="text-sm text-gray-600 space-y-1 bg-gray-50 p-3 rounded-xl">
                            <p className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {user.email}</p>
                            <p className="flex items-center gap-2"><Calendar size={14} className="text-gray-400" /> Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ Desktop Table */}
            <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
                            <tr>
                                <th className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest">User Details</th>
                                <th className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest">Role</th>
                                <th className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest">Joined Date</th>
                                <th className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest text-right">Account Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-50/20 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">
                                                <UserIcon size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6"><RoleBadge role={user.role} /></td>
                                    <td className="py-4 px-6 text-gray-500 font-medium">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-3">
                                            <span className={`text-[10px] font-black tracking-tighter ${user.status === "ACTIVE" ? 'text-green-600' : 'text-red-400'}`}>
                                                {user.status}
                                            </span>
                                            <ToggleSwitch
                                                active={user.status === "ACTIVE"}
                                                onToggle={() => handleToggleStatus(user.id, user.status)}
                                                loading={updatingId === user.id}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// ✅ Reusable Toggle Component
function ToggleSwitch({ active, onToggle, loading }: { active: boolean; onToggle: () => void; loading?: boolean }) {
    return (
        <button
            type="button"
            disabled={loading}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${active ? 'bg-green-500 shadow-inner' : 'bg-gray-200'}`}
        >
            <span
                className={`flex items-center justify-center h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-300 ease-in-out ${active ? 'translate-x-5' : 'translate-x-1'
                    }`}
            >
                {loading && <Loader2 size={10} className="animate-spin text-gray-400" />}
            </span>
        </button>
    );
}

function RoleBadge({ role }: { role: string }) {
    const variants = {
        ADMIN: "bg-purple-50 text-purple-700 border-purple-100",
        PROVIDER: "bg-blue-50 text-blue-700 border-blue-100",
        USER: "bg-gray-50 text-gray-700 border-gray-100"
    };
    const style = variants[role as keyof typeof variants] || variants.USER;

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${style} uppercase tracking-tight`}>
            {role}
        </span>
    );
}