import { authClient } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import OrderManager from "@/components/provider/OrderManager";

// API response type
type ApiOrderItem = {
    id: string;
    quantity: number;
    price_at_order: string;
    ordersId: string;
    orders: {
        id: string;
        customer_id: string;
        delivery_address: string;
        total_price: string;
        status: "PLACED" | "PREPARING" | "READY" | "DELIVERED";
        created_at: string;
    };
    meal: { name: string; price: string };
    customer: { name: string; email: string };
};

// Grouped UI Order type
type Order = {
    id: string;
    customer_name: string;
    customer_email: string;
    delivery_address: string;
    status: "PLACED" | "PREPARING" | "READY" | "DELIVERED";
    total: number;
    items: { name: string; quantity: number; price: string }[];
    createdAt: string;
};

async function getOrders() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const reqHeaders = new Headers();
        const cookieHeader = (await headers()).get("cookie");
        if (cookieHeader) reqHeaders.set("cookie", cookieHeader);
        if (token) reqHeaders.set("Authorization", `Bearer ${token}`);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/provider/orders`,
            { 
                next: { revalidate: 30 }, 
                headers: reqHeaders
            }
        );
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
            // ✅ Group multiple items belonging to the same order
            const orderMap = new Map<string, Order>();

            data.data.forEach((item: ApiOrderItem) => {
                const orderId = item.orders.id;
                if (!orderMap.has(orderId)) {
                    orderMap.set(orderId, {
                        id: orderId,
                        customer_name: item.customer?.name ?? "Unknown",
                        customer_email: item.customer?.email ?? "",
                        delivery_address: item.orders.delivery_address,
                        status: item.orders.status,
                        total: Number(item.orders.total_price),
                        items: [],
                        createdAt: item.orders.created_at,
                    });
                }
                orderMap.get(orderId)!.items.push({
                    name: item.meal?.name ?? "Unknown Meal",
                    quantity: item.quantity,
                    price: item.price_at_order,
                });
            });

            return Array.from(orderMap.values());
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch orders", error);
        return [];
    }
}

export default async function OrdersPage() {
    const session = await authClient.getSession({
        fetchOptions: {
            headers: await headers(),
            credentials: "include",
        },
    });

    const userRole = (session?.data?.user as any)?.role?.toUpperCase();
    if (session?.data && userRole && userRole !== "PROVIDER") {
        redirect("/");
    }

    const orders = session?.data ? await getOrders() : [];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                    Incoming Orders
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    Manage and update the status of your customer orders
                </p>
            </div>

            <OrderManager initialOrders={orders} />
        </div>
    );
}