"use client"

import { authClient } from "../../../auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    // ১. useEffect এর বাইরেই প্রাথমিক স্ট্যাটাস সেট করে দিন
    // যদি টোকেন না থাকে তবে শুরুতেই "No token..." দেখাবে, useEffect এ যাওয়া লাগবে না
    const [status, setStatus] = useState(token ? "Verifying.." : "No token found in URL.");

    useEffect(() => {
        // ২. যদি টোকেন থাকে তবেই কেবল এপিআই কল হবে
        if (token) {
            authClient.verifyEmail({ query: { token } }, {
                onSuccess: () => {
                    setStatus("Email verification successful. Please login here!");
                    setTimeout(() => router.push("/login"), 3000);
                },
                onError: (ctx) => {
                    setStatus("False token or another error: " + ctx.error.message);
                }
            });
        }
    }, [token, router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-center px-4">{status}</h1>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-orange-500 animate-pulse">Loading...</h1>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}