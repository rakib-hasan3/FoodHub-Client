// app/admin/layout.tsx

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            {/* যদি সাইডবার w-80 (320px) হয়, তবে ml-80 দিতে হবে */}
            <main className="flex-1 p-4 transition-all duration-300">
                <div className="p-">
                    {children}
                </div>
            </main>
        </div>
    );
}