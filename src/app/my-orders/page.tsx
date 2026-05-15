import { authClient } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import OrderList from "@/components/orders/OrderList";
import { Package } from "lucide-react";

async function getMyOrders() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        
        const reqHeaders = new Headers();
        const cookieHeader = (await headers()).get("cookie");
        if (cookieHeader) reqHeaders.set("cookie", cookieHeader);
        if (token) reqHeaders.set("Authorization", `Bearer ${token}`);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/my-orders`, {
            next: { revalidate: 30 },
            headers: reqHeaders
        });
        const data = await res.json();
        if (data.success) {
            return data.data;
        }
        return [];
    } catch (err) {
        console.error("Failed to fetch orders", err);
        return [];
    }
}

export default async function MyOrdersPage() {
    const session = await authClient.getSession({
        fetchOptions: {
            headers: await headers(),
        },
    });

    // If no session on server, we don't redirect to avoid loops
    // Client-side context will handle it.

    const orders = session?.data ? await getMyOrders() : [];

    return (
        <main className="min-h-screen py-12 bg-gray-50 dark:bg-black transition-colors duration-300 relative overflow-hidden">
            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <header className="mb-12 text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 mx-auto">
                        <Package className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Order History</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Orders</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Track and manage your recent deliveries</p>
                </header>

                <OrderList orders={orders} />
            </div>
        </main>
    );
}