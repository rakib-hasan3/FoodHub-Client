// app/provider/layout.tsx

import ProviderSidebar from "@/components/ProviderSidebar";

export default function ProviderAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen  bg-gray-50">
            <ProviderSidebar></ProviderSidebar>

            <main className="flex-1 p-4 transition-all duration-300">
                <div className="p-">
                    {children}
                </div>
            </main>
        </div>
    );
}