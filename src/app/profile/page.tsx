"use client";

import { authClient } from "../../../auth-client";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending)
        return (
            <p className="p-6 text-center text-gray-500">
                Loading profile...
            </p>
        );

    if (!session)
        return (
            <p className="p-6 text-center text-red-500">
                You are not logged in
            </p>
        );

    const user = session.user;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">

            {/* Profile Card */}
            <div className="bg-gradient-to-br from-orange-100 via-white to-green-100 p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">

                {/* Top Section */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">

                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                        {user.name?.charAt(0)}
                    </div>

                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            {user.name}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            User Profile
                        </p>
                    </div>
                </div>

                {/* Info Section */}
                <div className="bg-white rounded-2xl shadow-sm divide-y">

                    <ProfileRow label="Name" value={user.name} />
                    <ProfileRow label="Email" value={user.email} />
                    <ProfileRow label="User ID" value={user.id} />

                </div>

            </div>
        </div>
    );
};

const ProfileRow = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 text-sm">

        <span className="text-gray-500 mb-1 sm:mb-0">
            {label}
        </span>

        <span className="font-medium text-gray-800 break-all">
            {value}
        </span>
    </div>
);

export default ProfilePage;