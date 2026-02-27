"use client";

import { authClient } from "../../../auth-client";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return <p className="p-6">Loading...</p>;
    if (!session) return <p className="p-6">Not logged in</p>;

    const user = session.user;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white p-4 rounded-2xl shadow p-6 space-y-3">
                <h1 className="text-xl text-center font-semibold mb-4">My Profile</h1>

                <ProfileRow label="Name" value={user.name} />
                <ProfileRow label="Email" value={user.email} />
                <ProfileRow label="User ID" value={user.id} />
            </div>
        </div>
    );
};

const ProfileRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between border-b pb-2">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium">{value}</span>
    </div>
);

export default ProfilePage;