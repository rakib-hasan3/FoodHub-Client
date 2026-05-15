"use client";

import { useState } from "react";
import { User as UserIcon, Mail, Calendar, Loader2, ShieldCheck, UserCheck, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
};

export default function UserListManager({ initialUsers }: { initialUsers: User[] }) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleToggleStatus = async (userId: string, currentStatus: string) => {
        try {
            setUpdatingId(userId);
            const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

            // Optimistic update
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
            );

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user-management/users/${userId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update");
            toast.success(`Access updated: User is now ${newStatus.toLowerCase()}`);
        } catch (err) {
            toast.error("Security sync failed. Try again.");
            // Revert on error
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, status: currentStatus } : u))
            );
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-orange-500" />
                        </div>
                        <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.2em]">Platform Governance</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">User Directory</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Manage global access control and authorization levels</p>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="px-4 py-2 text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Accounts</p>
                        <p className="text-xl font-black text-gray-900 dark:text-white">{users.length}</p>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="grid grid-cols-1 gap-4 md:hidden pb-10">
                {users.map((user) => (
                    <div key={user.id} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-gray-200/20 dark:shadow-none border border-transparent dark:border-white/5 p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white font-black text-xl shadow-inner border border-gray-200 dark:border-white/10">
                                    {user.name[0]}
                                </div>
                                <div className="space-y-1">
                                    <p className="font-black text-gray-900 dark:text-white text-lg tracking-tight leading-none">{user.name}</p>
                                    <RoleBadge role={user.role} />
                                </div>
                            </div>
                            <ToggleSwitch
                                active={user.status === "ACTIVE"}
                                onToggle={() => handleToggleStatus(user.id, user.status)}
                                loading={updatingId === user.id}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 dark:text-gray-400 pt-2">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-transparent dark:border-white/5">
                                <Mail size={16} className="text-gray-400" />
                                <span className="font-bold truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-transparent dark:border-white/5">
                                <Calendar size={16} className="text-gray-400" />
                                <span className="font-bold uppercase text-[10px] tracking-widest">Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/10 dark:shadow-none border border-gray-100 dark:border-white/5 overflow-hidden transition-all pb-10">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5">
                            <tr>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Identity Details</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Access Tier</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500">Registration</th>
                                <th className="py-6 px-8 font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500 text-right">Operational Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-orange-50/30 dark:hover:bg-orange-500/[0.03] transition-all group">
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-gray-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 dark:text-zinc-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-inner">
                                                <UserIcon size={20} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-black text-gray-900 dark:text-white tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{user.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-gray-900 dark:text-white">{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Verified Account</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex items-center justify-end gap-6">
                                            <div className="flex flex-col items-end">
                                                <span className={`text-[10px] font-black tracking-widest uppercase ${user.status === "ACTIVE" ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {user.status}
                                                </span>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">System Lock</span>
                                            </div>
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
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-500 focus:outline-none ${
                loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${active ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-gray-200 dark:bg-zinc-800'}`}
        >
            <span
                className={`flex items-center justify-center h-5 w-5 transform rounded-full bg-white shadow-md transition duration-500 ease-in-out ${
                    active ? 'translate-x-6' : 'translate-x-1'
                }`}
            >
                {loading && <Loader2 size={10} className="animate-spin text-orange-500" />}
            </span>
        </button>
    );
}

function RoleBadge({ role }: { role: string }) {
    const isAdmin = role === "ADMIN";
    const isProvider = role === "PROVIDER";
    const Icon = isAdmin ? ShieldAlert : isProvider ? UserCheck : UserIcon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${
            isAdmin ? "bg-purple-500/10 text-purple-600 border-purple-500/20" :
            isProvider ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
            "bg-orange-500/10 text-orange-600 border-orange-500/20"
        }`}>
            <Icon size={10} />
            {role}
        </span>
    );
}
