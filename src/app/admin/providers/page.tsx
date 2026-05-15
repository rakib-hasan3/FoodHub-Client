import { authClient } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProviderListManager from "@/components/admin/ProviderListManager";

async function getProviders() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const reqHeaders = new Headers();
        const cookieHeader = (await headers()).get("cookie");
        if (cookieHeader) reqHeaders.set("cookie", cookieHeader);
        if (token) reqHeaders.set("Authorization", `Bearer ${token}`);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/provider/dashboard-stats`, {
            headers: reqHeaders,
            next: { revalidate: 30 },
        });
        const result = await response.json();
        return result.data || [];
    } catch (err) {
        console.error("Fetch Error:", err);
        return [];
    }
}

export default async function AdminProvidersPage() {
    const session = await authClient.getSession({
        fetchOptions: {
            headers: await headers(),
            credentials: "include",
        },
    });

    const userRole = (session?.data?.user as any)?.role?.toUpperCase();
    if (session?.data && userRole && userRole !== "ADMIN") {
        redirect("/");
    }

    const providers = session?.data ? await getProviders() : [];

    return (
        <div className="space-y-10 max-w-[1400px] mx-auto pb-10 px-4 md:px-8">
            <ProviderListManager initialProviders={providers} />
        </div>
    );
}