import { authClient } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ProviderMealManager from "@/components/provider/ProviderMealManager";

async function getMeals(providerId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const reqHeaders = new Headers();
        const cookieHeader = (await headers()).get("cookie");
        if (cookieHeader) reqHeaders.set("cookie", cookieHeader);
        if (token) reqHeaders.set("Authorization", `Bearer ${token}`);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/meals/my-meals/${providerId}`,
            { 
                headers: reqHeaders,
                next: { revalidate: 30 } 
            }
        );
        const data = await res.json();
        if (data.success) {
            return data.data;
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch meals", error);
        return [];
    }
}

export default async function MyMealsPage() {
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

    const providerId = session?.data?.user?.id;
    const meals = providerId ? await getMeals(providerId) : [];

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
            <ProviderMealManager initialMeals={meals} type="all" />
        </div>
    );
}