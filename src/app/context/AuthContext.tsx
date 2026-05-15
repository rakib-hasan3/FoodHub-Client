"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                credentials: "include",
            });

            if (res.ok) {
                const result = await res.json();
                setUser(result.data);
                setToken(localStorage.getItem("accessToken"));
            } else {
                setUser(null);
                setToken(null);
                localStorage.removeItem("accessToken");
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem("accessToken", newToken);
        
        // Redirect based on role
        const role = newUser.role?.toUpperCase();
        console.log("Login successful! Role:", role);

        if (role === "ADMIN") {
            console.log("Redirecting to Admin Dashboard...");
            router.push("/admin/dashboard");
        } else if (role === "PROVIDER") {
            console.log("Redirecting to Provider Dashboard...");
            router.push("/provider/dashboard");
        } else {
            console.log("Redirecting to Home...");
            router.push("/");
        }

        // Delay state update to prevent UI flashing before the redirect completes
        setTimeout(() => {
            setToken(newToken);
            setUser(newUser);
        }, 800);
    };

    const logout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout failed", error);
        }
        
        localStorage.removeItem("accessToken");
        router.push("/login");

        // Delay state update to prevent UI flashing before the redirect completes
        setTimeout(() => {
            setUser(null);
            setToken(null);
        }, 800);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
