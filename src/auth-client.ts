"use client";
import { useState, useEffect } from "react";
import { authClient as core } from "./lib/auth";

export const authClient = {
    ...core,
    useSession: () => {
        const [data, setData] = useState<any>(null);
        const [isPending, setIsPending] = useState(true);

        useEffect(() => {
            const check = async () => {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    setData(null);
                    setIsPending(false);
                    return;
                }

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const result = await res.json();
                    if (result.success) {
                        setData({ user: result.data });
                    } else {
                        setData(null);
                    }
                } catch (e) {
                    setData(null);
                } finally {
                    setIsPending(false);
                }
            };
            check();
        }, []);

        return { data, isPending };
    }
};