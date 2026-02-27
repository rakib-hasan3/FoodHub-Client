"use client"
import { authClient } from "../../../auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const [status, setStatus] = useState("Verifying..");

    useEffect(() => {
        if (token) {
            authClient.verifyEmail({ query: { token } }, {
                onSuccess: () => {
                    setStatus("Emai verification successfull. Please login here !");
                    setTimeout(() => router.push("/login"), 3000); // ৩ সেকেন্ড পর লগইন পেজে যাবে
                },
                onError: (ctx) => setStatus("False token or another error: " + ctx.error.message)
            });
        }
    }, [token, router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">{status}</h1>
        </div>
    );
}