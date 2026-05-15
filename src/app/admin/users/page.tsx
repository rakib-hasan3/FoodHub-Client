import { authClient } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserListManager from "@/components/admin/UserListManager";

async function getUsers() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const reqHeaders = new Headers();
        const cookieHeader = (await headers()).get("cookie");
        if (cookieHeader) reqHeaders.set("cookie", cookieHeader);
        if (token) reqHeaders.set("Authorization", `Bearer ${token}`);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user-management/users`, {
            headers: reqHeaders,
            next: { revalidate: 30 },
        });
        const data = await res.json();
        return data.data || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default async function AdminUsersPage() {
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

    const users = session?.data ? await getUsers() : [];

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <UserListManager initialUsers={users} />
        </div>
    );
}