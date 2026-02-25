import { Provider } from "better-auth/plugins";

export interface Meal {
    id: string;
    name: string;
    price: number;
    status: string;
    category: string;
    image: string;
}

export interface ProviderStats {
    id: string;
    restaurantName: string;
    address: string;
    totalMeals: number;
    totalOrders: number;
    activeOrders: number;
    totalRevenue: number;
    meals: Meal[];
}
interface ProviderDashboardResponse {
    success: boolean;
    data: Provider[];
}
// API fetch function
export async function getProviderDashboard(): Promise<ProviderStats> {
    const token = localStorage.getItem("accessToken") || "";

    const res = await fetch("http://localhost:5000/api/provider/dashboard-stats", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch provider dashboard data");
    }

    const result = await res.json();

    // ধরছি API response অনুযায়ী data structure
    return result.data[0]; // API থেকে data array আসছে, আমরা first provider নিয়ে কাজ করি
}