import { authClient } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ProfileManager from "@/components/provider/ProfileManager";

async function getProviderProfile() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const reqHeaders = new Headers();
        const cookieHeader = (await headers()).get("cookie");
        if (cookieHeader) reqHeaders.set("cookie", cookieHeader);
        if (token) reqHeaders.set("Authorization", `Bearer ${token}`);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/provider/getprofile`,
            {
                headers: reqHeaders,
                next: { revalidate: 30 },
            }
        );

        if (res.ok) {
            const data = await res.json();
            if (data) {
                return {
                    providerName: data.restaurant_name,
                    phone: data.contact_number,
                    address: data.address,
                    image: data.image || "",
                };
            }
        }
        return null;
    } catch (error) {
        console.error("Profile fetch error:", error);
        return null;
    }
}

export default async function ProviderProfilePage() {
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

    const profile = session?.data ? await getProviderProfile() : null;

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
            <h1 className="text-4xl font-black mb-12 text-gray-900 dark:text-white tracking-tighter">
                Provider Identity
            </h1>
            <ProfileManager initialProfile={profile} userId={session?.data?.user?.id} />
        </div>
    );
}