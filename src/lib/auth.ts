
export const authClient = {
    getSession: async (options?: any) => {
        if (typeof window === "undefined") {
            try {
                const { cookies } = await import("next/headers");
                const cookieStore = await cookies();
                const token = cookieStore.get("accessToken")?.value;
                
                // If no cookie, return null but don't error. 
                // The client will check localStorage as a fallback.
                if (!token) return { data: null };

                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                
                const reqHeaders = new Headers();
                reqHeaders.set("Authorization", `Bearer ${token}`);
                
                // If fetchOptions.headers is passed (usually Next.js headers()), safely extract cookie
                if (options?.fetchOptions?.headers) {
                    try {
                        const nextHeaders = options.fetchOptions.headers;
                        const cookieHeader = typeof nextHeaders.get === 'function' ? nextHeaders.get("cookie") : undefined;
                        if (cookieHeader) reqHeaders.set("cookie", cookieHeader);
                    } catch (e) {}
                }

                const res = await fetch(`${apiUrl}/api/auth/me`, {
                    headers: reqHeaders,
                });
                
                if (!res.ok) return { data: null };
                
                const result = await res.json();
                return result.success ? { data: { user: result.data } } : { data: null };
            } catch (e) {
                return { data: null };
            }
        }
        
        const token = localStorage.getItem("accessToken");
        if (!token) return { data: null };

        try {
            // On client, we use relative path to trigger Next.js rewrite for cookies
            const res = await fetch(`/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await res.json();
            return result.success ? { data: { user: result.data } } : { data: null };
        } catch (e) {
            return { data: null };
        }
    },

    signOut: async (options?: any) => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
        }
        if (options?.fetchOptions?.onSuccess) {
            options.fetchOptions.onSuccess();
        }
        return { success: true };
    },

    signIn: {
        email: async (data: any, options?: any) => {
            if (options?.onRequest) options.onRequest();
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                const result = await res.json();
                if (result.success) {
                    if (typeof window !== "undefined") {
                        localStorage.setItem("accessToken", result.data.accessToken);
                    }
                    if (options?.onSuccess) options.onSuccess({ data: result.data });
                } else {
                    if (options?.onError) options.onError({ error: { message: result.message } });
                }
            } catch (e) {
                if (options?.onError) options.onError({ error: { message: "Network error" } });
            }
        },
        social: async (data: any) => {
            if (typeof window !== "undefined") {
                alert("Social login needs setup on Google Console for this custom auth.");
            }
        }
    },

    verifyEmail: async (data: any, options?: any) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data.query),
            });
            const result = await res.json();
            if (result.success) {
                if (options?.onSuccess) options.onSuccess();
            } else {
                if (options?.onError) options.onError({ error: { message: result.message } });
            }
        } catch (e) {
            if (options?.onError) options.onError({ error: { message: "Network error" } });
        }
    },
};
