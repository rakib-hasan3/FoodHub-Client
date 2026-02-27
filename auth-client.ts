// lib/auth-client.ts
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"  // আপনার ব্যাকএন্ড সার্ভার ইউআরএল
})